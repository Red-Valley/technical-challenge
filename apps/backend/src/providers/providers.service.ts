import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProviderDto } from './dto/create-provider.dto'
import { Provider } from '@prisma/client'

@Injectable()
export class ProvidersService {
	constructor(private prisma: PrismaService) {}

	async create(createProviderDto: CreateProviderDto): Promise<Provider> {
		try {
			const provider = await this.prisma.provider.create({
				data: createProviderDto
			})

			return provider
		} catch (error) {
			// Manejo de errores específicos de la base de datos
			throw new ConflictException('Error creating provider')
		}
	}

	async findAll(): Promise<Provider[]> {
		return await this.prisma.provider.findMany({
			include: {
				_count: {
					select: {
						patients: true
					}
				}
			},
			orderBy: {
				created_at: 'desc'
			}
		})
	}

	async findOne(id: string): Promise<Provider> {
		const provider = await this.prisma.provider.findUnique({
			where: { id },
			include: {
				patients: {
					include: {
						status: true
					}
				}
			}
		})

		if (!provider) {
			throw new NotFoundException(`Provider with ID ${id} not found`)
		}

		return provider
	}

	async getProviderStats(id: string) {
		const provider = await this.findOne(id)

		const totalPatients = await this.prisma.patient.count({
			where: { provider_id: id }
		})

		const stats = await this.prisma.patient.groupBy({
			by: ['status_id'],
			where: {
				provider_id: id
			},
			_count: {
				status_id: true
			}
		})

		const statusCounts = await Promise.all(
			stats.map(async stat => {
				const status = await this.prisma.status.findUnique({
					where: { id: stat.status_id }
				})
				return {
					status: status?.name,
					count: stat._count.status_id
				}
			})
		)

		return {
			provider: {
				id: provider.id,
				full_name: provider.full_name,
				specialty: provider.specialty
			},
			totalPatients,
			statusDistribution: statusCounts
		}
	}
}
