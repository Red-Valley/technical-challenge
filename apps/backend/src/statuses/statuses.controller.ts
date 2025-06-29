import { Controller, Get, Param } from '@nestjs/common'
import { StatusesService, StatusWithChildren } from './statuses.service'

@Controller('statuses')
export class StatusesController {
	constructor(private readonly statusesService: StatusesService) {}

	@Get()
	async findAll(): Promise<{ message: string; data: StatusWithChildren[]; count: number }> {
		const statuses = await this.statusesService.findAll()

		return {
			message: 'Statuses retrieved successfully',
			data: statuses,
			count: statuses.length
		}
	}

	@Get('hierarchy')
	async getHierarchy(): Promise<{ message: string; data: StatusWithChildren[] }> {
		const hierarchy = await this.statusesService.getHierarchy()

		return {
			message: 'Status hierarchy retrieved successfully',
			data: hierarchy
		}
	}

	@Get('stats')
	async getStats() {
		const stats = await this.statusesService.getStatusStats()

		return {
			message: 'Status statistics retrieved successfully',
			data: stats
		}
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<{ message: string; data: StatusWithChildren }> {
		const status = await this.statusesService.findOne(id)

		return {
			message: 'Status retrieved successfully',
			data: status
		}
	}

	@Get(':id/path')
	async getStatusPath(@Param('id') id: string) {
		const path = await this.statusesService.getStatusPath(id)

		return {
			message: 'Status path retrieved successfully',
			data: path
		}
	}

	@Get(':id/children')
	async getChildren(
		@Param('id') id: string
	): Promise<{ message: string; data: StatusWithChildren[]; count: number }> {
		const children = await this.statusesService.getChildrenStatuses(id)

		return {
			message: 'Child statuses retrieved successfully',
			data: children,
			count: children.length
		}
	}

	@Get(':id/transitions')
	async getAvailableTransitions(
		@Param('id') id: string
	): Promise<{ message: string; data: StatusWithChildren[]; count: number }> {
		const transitions = await this.statusesService.getAvailableTransitions(id)

		return {
			message: 'Available transitions retrieved successfully',
			data: transitions,
			count: transitions.length
		}
	}
}
