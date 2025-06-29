import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Status } from '@prisma/client'

export interface StatusWithChildren extends Status {
	children?: StatusWithChildren[]
	parent?: Status | null
}

@Injectable()
export class StatusesService {
	constructor(private prisma: PrismaService) {}

	async findAll(): Promise<StatusWithChildren[]> {
		return await this.prisma.status.findMany({
			include: {
				parent: true,
				children: {
					include: {
						children: true // Para obtener hasta 2 niveles de profundidad
					}
				}
			},
			orderBy: {
				order: 'asc'
			}
		})
	}

	async findOne(id: string): Promise<StatusWithChildren> {
		const status = await this.prisma.status.findUnique({
			where: { id },
			include: {
				parent: true,
				children: {
					include: {
						children: true
					}
				}
			}
		})

		if (!status) {
			throw new NotFoundException(`Status with ID ${id} not found`)
		}

		return status
	}

	async getHierarchy(): Promise<StatusWithChildren[]> {
		// Obtener todos los estados raíz (sin padre)
		const rootStatuses = await this.prisma.status.findMany({
			where: {
				parent_id: null
			},
			include: {
				children: {
					include: {
						children: {
							include: {
								children: true // Para obtener hasta 3 niveles de profundidad
							}
						}
					},
					orderBy: {
						order: 'asc'
					}
				}
			},
			orderBy: {
				order: 'asc'
			}
		})

		return rootStatuses
	}

	async getStatusPath(id: string): Promise<Status[]> {
		const status = await this.findOne(id)
		const path: Status[] = []

		let currentStatus: StatusWithChildren | null = status

		// Recorrer hacia arriba para obtener toda la ruta
		while (currentStatus) {
			path.unshift(currentStatus)

			if (currentStatus.parent_id) {
				currentStatus = await this.prisma.status.findUnique({
					where: { id: currentStatus.parent_id },
					include: {
						parent: true,
						children: true
					}
				})
			} else {
				currentStatus = null
			}
		}

		return path
	}

	async getChildrenStatuses(id: string): Promise<StatusWithChildren[]> {
		const status = await this.findOne(id)

		return await this.prisma.status.findMany({
			where: {
				parent_id: id
			},
			include: {
				children: {
					include: {
						children: true
					}
				}
			},
			orderBy: {
				order: 'asc'
			}
		})
	}

	async getAvailableTransitions(currentStatusId: string): Promise<StatusWithChildren[]> {
		const currentStatus = await this.findOne(currentStatusId)

		// Obtener los estados a los que se puede transicionar desde el estado actual
		// En este caso simple, se pueden transicionar a los estados hijos del estado actual
		// o a los estados hermanos (mismos hijos del padre)

		const availableStatuses: StatusWithChildren[] = []

		// 1. Estados hijos del estado actual
		if (currentStatus.children && currentStatus.children.length > 0) {
			availableStatuses.push(...currentStatus.children)
		}

		// 2. Estados hermanos (mismo padre)
		if (currentStatus.parent_id) {
			const siblings = await this.prisma.status.findMany({
				where: {
					parent_id: currentStatus.parent_id,
					id: {
						not: currentStatusId // Excluir el estado actual
					}
				},
				include: {
					parent: true,
					children: true
				},
				orderBy: {
					order: 'asc'
				}
			})

			availableStatuses.push(...siblings)
		}

		// Remover duplicados por ID
		const uniqueStatuses = availableStatuses.filter(
			(status, index, self) => index === self.findIndex(s => s.id === status.id)
		)

		return uniqueStatuses
	}

	async getStatusStats(): Promise<any> {
		const stats = await this.prisma.patient.groupBy({
			by: ['status_id'],
			_count: {
				status_id: true
			}
		})

		const statusCounts = await Promise.all(
			stats.map(async stat => {
				const status = await this.prisma.status.findUnique({
					where: { id: stat.status_id },
					include: {
						parent: true
					}
				})
				return {
					status: {
						id: status?.id,
						name: status?.name,
						parent: status?.parent?.name || null
					},
					count: stat._count.status_id
				}
			})
		)

		const totalPatients = await this.prisma.patient.count()

		return {
			totalPatients,
			statusDistribution: statusCounts
		}
	}
}
