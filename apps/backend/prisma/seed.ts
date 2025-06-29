import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	console.log('🌱 Starting seeding...')

	// Limpiar datos existentes (opcional en desarrollo)
	await prisma.statusHistory.deleteMany()
	await prisma.patient.deleteMany()
	await prisma.provider.deleteMany()
	await prisma.status.deleteMany()

	// Crear estados con jerarquía
	console.log('📊 Creating statuses...')

	// 1. Estado raíz: Scheduled
	const scheduledStatus = await prisma.status.create({
		data: {
			name: 'Scheduled',
			parent_id: null,
			order: 1
		}
	})

	// 2. Estados hijos de Scheduled
	const checkedInStatus = await prisma.status.create({
		data: {
			name: 'Checked-In',
			parent_id: scheduledStatus.id,
			order: 2
		}
	})

	const _noShowStatus = await prisma.status.create({
		data: {
			name: 'No-Show',
			parent_id: scheduledStatus.id,
			order: 3
		}
	})

	// 3. Estados hijos de Checked-In
	const inConsultationStatus = await prisma.status.create({
		data: {
			name: 'In Consultation',
			parent_id: checkedInStatus.id,
			order: 4
		}
	})

	const _cancelledStatus = await prisma.status.create({
		data: {
			name: 'Cancelled',
			parent_id: checkedInStatus.id,
			order: 5
		}
	})

	console.log('✅ Statuses created successfully')

	// Crear proveedores de ejemplo
	console.log('👨‍⚕️ Creating providers...')

	const providers = await Promise.all([
		prisma.provider.create({
			data: {
				full_name: 'Dr. María García López',
				specialty: 'Cardiología'
			}
		}),
		prisma.provider.create({
			data: {
				full_name: 'Dr. Juan Carlos Mendoza',
				specialty: 'Medicina General'
			}
		}),
		prisma.provider.create({
			data: {
				full_name: 'Dra. Ana Isabel Rodríguez',
				specialty: 'Pediatría'
			}
		}),
		prisma.provider.create({
			data: {
				full_name: 'Dr. Carlos Alberto Vega',
				specialty: 'Dermatología'
			}
		})
	])

	console.log('✅ Providers created successfully')

	// Crear pacientes de ejemplo
	console.log('👥 Creating patients...')

	const patients = await Promise.all([
		prisma.patient.create({
			data: {
				full_name: 'José Antonio Pérez',
				email: 'jose.perez@email.com',
				phone: '+52 555 123 4567',
				provider_id: providers[0].id,
				status_id: scheduledStatus.id
			}
		}),
		prisma.patient.create({
			data: {
				full_name: 'Laura Martínez Sánchez',
				email: 'laura.martinez@email.com',
				phone: '+52 555 234 5678',
				provider_id: providers[1].id,
				status_id: checkedInStatus.id
			}
		}),
		prisma.patient.create({
			data: {
				full_name: 'Roberto González Díaz',
				email: 'roberto.gonzalez@email.com',
				phone: '+52 555 345 6789',
				provider_id: providers[2].id,
				status_id: inConsultationStatus.id
			}
		}),
		prisma.patient.create({
			data: {
				full_name: 'Carmen López Torres',
				email: 'carmen.lopez@email.com',
				phone: '+52 555 456 7890',
				provider_id: providers[3].id,
				status_id: scheduledStatus.id
			}
		})
	])

	console.log('✅ Patients created successfully')

	// Crear historial de estados de ejemplo
	console.log('📈 Creating status history...')

	// Historial para el segundo paciente (Laura)
	await prisma.statusHistory.create({
		data: {
			patient_id: patients[1].id,
			status_id: scheduledStatus.id,
			changed_at: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 horas atrás
		}
	})

	await prisma.statusHistory.create({
		data: {
			patient_id: patients[1].id,
			status_id: checkedInStatus.id,
			changed_at: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hora atrás
		}
	})

	// Historial para el tercer paciente (Roberto)
	await prisma.statusHistory.create({
		data: {
			patient_id: patients[2].id,
			status_id: scheduledStatus.id,
			changed_at: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 horas atrás
		}
	})

	await prisma.statusHistory.create({
		data: {
			patient_id: patients[2].id,
			status_id: checkedInStatus.id,
			changed_at: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 horas atrás
		}
	})

	await prisma.statusHistory.create({
		data: {
			patient_id: patients[2].id,
			status_id: inConsultationStatus.id,
			changed_at: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hora atrás
		}
	})

	console.log('✅ Status history created successfully')

	console.log('🎉 Seeding completed!')
	console.log(`📋 Statuses created: ${await prisma.status.count()}`)
	console.log(`👨‍⚕️ Providers created: ${await prisma.provider.count()}`)
	console.log(`👥 Patients created: ${await prisma.patient.count()}`)
	console.log(`📈 History records: ${await prisma.statusHistory.count()}`)
}

main()
	.catch(e => {
		console.error('❌ Error during seeding:', e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
