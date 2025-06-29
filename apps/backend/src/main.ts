import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { GlobalExceptionFilter } from './common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// Configurar CORS para permitir conexiones desde el frontend
	app.enableCors({
		origin: ['http://localhost:3001', 'http://frontend:3001'],
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
		credentials: true
	})

	// Configurar filtro global de excepciones
	app.useGlobalFilters(new GlobalExceptionFilter())

	// Configurar validación global
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true
		})
	)

	// Configurar prefijo global para todas las rutas
	app.setGlobalPrefix('api')

	const port = process.env.PORT ?? 3000
	await app.listen(port)

	console.log(`📚 API available at http://localhost:${port}/api`)
}

void bootstrap()
