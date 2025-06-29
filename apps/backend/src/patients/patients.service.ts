import {
	Injectable,
	ConflictException,
	NotFoundException,
	BadRequestException
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientStatusDto } from './dto/update-patient-status.dto'
import { Patient, StatusHistory } from '@prisma/client'

@Injectable()
export class PatientsService {
	constructor(private prisma: PrismaService) {}

	async create(createPatientDto: CreatePatientDto): Promise<Patient> {
		// Verificar que el proveedor existe
		const provider = await this.prisma.provider.findUnique({
			where: { id: createPatientDto.provider_id }
		})

		if (!provider) {
			throw new NotFoundException(`Provider with ID ${createPatientDto.provider_id} not found`)
		}

		// Verificar que el estado existe
		const status = await this.prisma.status.findUnique({
			where: { id: createPatientDto.status_id }
		})

		if (!status) {
			throw new NotFoundException(`Status with ID ${createPatientDto.status_id} not found`)
		}

		// Verificar que el email no existe
		const existingPatient = await this.prisma.patient.findUnique({
			where: { email: createPatientDto.email }
		})

		if (existingPatient) {
			throw new ConflictException('A patient with this email already exists')
		}

		try {
			// Crear el paciente y su historial inicial en una transacción
			const result = await this.prisma.$transaction(async prisma => {
				// Crear el paciente
				const patient = await prisma.patient.create({
					data: createPatientDto,
					include: {
						provider: true,
						status: true
					}
				})

				// Crear el primer registro en el historial
				await prisma.statusHistory.create({
					data: {
						patient_id: patient.id,
						status_id: patient.status_id,
						changed_at: new Date()
					}
				})

				return patient
			})

			return result
		} catch (error) {
			throw new ConflictException('Error creating patient')
		}
	}

	async findAll(): Promise<Patient[]> {
		return await this.prisma.patient.findMany({
			include: {
				provider: {
					select: {
						id: true,
						full_name: true,
						specialty: true
					}
				},
				status: {
					select: {
						id: true,
						name: true
					}
				}
			},
			orderBy: {
				created_at: 'desc'
			}
		})
	}

	async findOne(id: string): Promise<Patient> {
		const patient = await this.prisma.patient.findUnique({
			where: { id },
			include: {
				provider: true,
				status: true,
				status_history: {
					include: {
						status: true
					},
					orderBy: {
						changed_at: 'desc'
					}
				}
			}
		})

		if (!patient) {
			throw new NotFoundException(`Patient with ID ${id} not found`)
		}

		return patient
	}

	async updateStatus(id: string, updatePatientStatusDto: UpdatePatientStatusDto): Promise<Patient> {
		// Verificar que el paciente existe
		const patient = await this.findOne(id)

		// Verificar que el nuevo estado existe
		const newStatus = await this.prisma.status.findUnique({
			where: { id: updatePatientStatusDto.status_id }
		})

		if (!newStatus) {
			throw new NotFoundException(`Status with ID ${updatePatientStatusDto.status_id} not found`)
		}

		// Verificar que no es el mismo estado actual
		if (patient.status_id === updatePatientStatusDto.status_id) {
			throw new BadRequestException('Patient already has this status assigned')
		}

		try {
			// Actualizar el estado del paciente y crear el historial en una transacción
			const result = await this.prisma.$transaction(async prisma => {
				// Actualizar el estado del paciente
				const updatedPatient = await prisma.patient.update({
					where: { id },
					data: {
						status_id: updatePatientStatusDto.status_id
					},
					include: {
						provider: true,
						status: true
					}
				})

				// Crear el registro en el historial
				await prisma.statusHistory.create({
					data: {
						patient_id: id,
						status_id: updatePatientStatusDto.status_id,
						changed_at: new Date()
					}
				})

				return updatedPatient
			})

			return result
		} catch (error) {
			throw new ConflictException('Error updating patient status')
		}
	}

	async getStatusHistory(id: string): Promise<StatusHistory[]> {
		// Verificar que el paciente existe
		await this.findOne(id)

		return await this.prisma.statusHistory.findMany({
			where: { patient_id: id },
			include: {
				status: {
					select: {
						id: true,
						name: true
					}
				}
			},
			orderBy: {
				changed_at: 'desc'
			}
		})
	}

	async getPatientsByProvider(providerId: string): Promise<Patient[]> {
		return await this.prisma.patient.findMany({
			where: { provider_id: providerId },
			include: {
				status: {
					select: {
						id: true,
						name: true
					}
				}
			},
			orderBy: {
				created_at: 'desc'
			}
		})
	}

	async getPatientsByStatus(statusId: string): Promise<Patient[]> {
		return await this.prisma.patient.findMany({
			where: { status_id: statusId },
			include: {
				provider: {
					select: {
						id: true,
						full_name: true,
						specialty: true
					}
				}
			},
			orderBy: {
				created_at: 'desc'
			}
		})
	}
}
