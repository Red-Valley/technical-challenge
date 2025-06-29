import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	ValidationPipe,
	UsePipes,
	HttpStatus,
	HttpCode
} from '@nestjs/common'
import { ProvidersService } from './providers.service'
import { CreateProviderDto } from './dto/create-provider.dto'

@Controller('providers')
export class ProvidersController {
	constructor(private readonly providersService: ProvidersService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
	async create(@Body() createProviderDto: CreateProviderDto) {
		const provider = await this.providersService.create(createProviderDto)

		return {
			message: 'Provider created successfully',
			data: provider
		}
	}

	@Get()
	async findAll() {
		const providers = await this.providersService.findAll()

		return {
			message: 'Providers retrieved successfully',
			data: providers,
			count: providers.length
		}
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const provider = await this.providersService.findOne(id)

		return {
			message: 'Provider retrieved successfully',
			data: provider
		}
	}

	@Get(':id/stats')
	async getStats(@Param('id') id: string) {
		const stats = await this.providersService.getProviderStats(id)

		return {
			message: 'Provider statistics retrieved successfully',
			data: stats
		}
	}
}
