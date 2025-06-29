import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Query,
	ValidationPipe,
	UsePipes,
	HttpStatus,
	HttpCode
} from '@nestjs/common'
import { PatientsService } from './patients.service'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientStatusDto } from './dto/update-patient-status.dto'
import {
	ApiResponse,
	createCreatedResponse,
	createRetrievedResponse,
	createRetrievedListResponse,
	createUpdatedResponse
} from '../common'

@Controller('patients')
export class PatientsController {
	constructor(private readonly patientsService: PatientsService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
	async create(@Body() createPatientDto: CreatePatientDto): Promise<ApiResponse> {
		const patient = await this.patientsService.create(createPatientDto)
		return createCreatedResponse('Patient', patient)
	}

	@Get()
	async findAll(
		@Query('provider') providerId?: string,
		@Query('status') statusId?: string
	): Promise<ApiResponse> {
		let patients

		if (providerId) {
			patients = await this.patientsService.getPatientsByProvider(providerId)
		} else if (statusId) {
			patients = await this.patientsService.getPatientsByStatus(statusId)
		} else {
			patients = await this.patientsService.findAll()
		}

		return createRetrievedListResponse('Patients', patients)
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<ApiResponse> {
		const patient = await this.patientsService.findOne(id)
		return createRetrievedResponse('Patient', patient)
	}

	@Patch(':id/status')
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
	async updateStatus(
		@Param('id') id: string,
		@Body() updatePatientStatusDto: UpdatePatientStatusDto
	): Promise<ApiResponse> {
		const patient = await this.patientsService.updateStatus(id, updatePatientStatusDto)
		return createUpdatedResponse('Patient status', patient)
	}

	@Get(':id/status-history')
	async getStatusHistory(@Param('id') id: string): Promise<ApiResponse> {
		const history = await this.patientsService.getStatusHistory(id)
		return createRetrievedListResponse('Patient status history', history)
	}
}
