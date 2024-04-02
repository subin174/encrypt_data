import {
    Controller,
    Get,
    Injectable,
    Body,
    UseGuards,
    Put,
    Query,
    Param
} from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiBearerAuth,
    ApiQuery
} from '@nestjs/swagger';
import { BaseResponse } from '../config/base-response.res';
import { RolesGuard } from 'src/config/auth/roles-auth.guard';
import { JwtAuthGuard } from "../config/auth/jwt-auth.guard";
import { Roles } from 'src/config/decorator/roles.decorator';
import { EncryptionService } from 'src/service/crypto.service';

@ApiResponse({ status: 200, description: 'Successfully.' })
@ApiResponse({ status: 500, description: 'Server error.' })
@ApiResponse({ status: 400, description: 'BadRequest.' })
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@Injectable()
@ApiTags('App')
@Controller('/api/v1/crypt')
export class CryptController {

    constructor(
        private readonly service: EncryptionService
    ) { }

    @ApiOperation({ summary: 'encrypt' })
    @ApiResponse({ type: BaseResponse })
    @ApiQuery({ name: 'data', required: false, description: 'data' })
    @Get()
    encryptData(
        @Query('data') data?: string,
    ) {
        return this.service.encryptData(data);
    }

    @ApiOperation({ summary: 'decrypt' })
    @ApiResponse({ type: BaseResponse })
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard,RolesGuard)
    // @Roles('ADMIN')
    @Get('/decrypt')
    decryptData(
        @Query('data') data?: string,
    ) {
        return this.service.decryptData(data);
    }

    @ApiOperation({ summary: 'user' })
    @ApiResponse({ type: BaseResponse })
    @Get('/list')
    listUser(
    ) {
        return this.service.encryptUser();
    }
}
