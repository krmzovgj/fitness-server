import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantService {
    constructor(private prisma: PrismaService) {}

    async createTenant(dto: CreateTenantDto) {
        const existing = await this.prisma.tenant.findUnique({
            where: {
                subdomain: dto.subdomain,
            },
        });

        if (existing) {
            throw new BadRequestException(
                `Tenant with subdomain ${existing.subdomain} already exists`,
            );
        }

        return await this.prisma.tenant.create({
            data: {
                name: dto.name,
                subdomain: dto.subdomain,
            },
        });
    }

    async updateTenant(tenantId: string, dto: UpdateTenantDto) {
        if (!tenantId) {
            throw new BadRequestException('Tenant id is required');
        }

        return await this.prisma.tenant.update({
            where: {
                id: tenantId,
            },
            data: {
                name: dto.name,
                subdomain: dto.subdomain,
            },
        });
    }
}
