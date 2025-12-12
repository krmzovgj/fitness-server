import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../auth/roles.enum';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Controller('tenant')
export class TenantController {
    constructor(private tenantService: TenantService) {}

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    createTenant(@Body() dto: CreateTenantDto) {
        return this.tenantService.createTenant(dto);
    }

    @Get(':subdomain')
    getTenantBySubdomain(@Param('subdomain') subdomain: string) {
        return this.tenantService.getTenantBySubdomain(subdomain);
    }

    @Put(':tenantId')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    updateTenant(
        @Param('tenantId') tenantId: string,
        @Body() dto: UpdateTenantDto,
    ) {
        return this.tenantService.updateTenant(tenantId, dto);
    }
}
