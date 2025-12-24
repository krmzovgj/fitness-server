import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TenantGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const tenantIdHeaders = request.headers['tenantid'];
        const { id } = request.user;

        if (!tenantIdHeaders) {
            throw new BadRequestException('Tenant id is required');
        }

        const tenantId = String(tenantIdHeaders);

        const user = await this.prisma.user.findFirst({
            where: {
                id,
                tenantId,
            },
        });

        if (!user) {
            throw new UnauthorizedException('You are not part of this tenant');
        }

        request['tenantId'] = tenantId;

        return true;
    }
}
