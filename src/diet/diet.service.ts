import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DietService {
    constructor(private prisma: PrismaService) {}

    async getClientsDiet(clientId: number) {
        if (!clientId) {
            throw new BadRequestException('Client id is required');
        }

        const client = await this.prisma.diet.findMany({
            where: {
                clientId,
            },
        });

        if (!client) {
            throw new NotFoundException('Client not found');
        }

        return await this.prisma.diet.findMany({
            where: {
                clientId,
            },
        });
    }

    async getMeals(dietId: string) {
        if (!dietId) {
            throw new BadRequestException('Diet id is required');
        }

        return await this.prisma.meal.findMany({
            where: {
                dietId,
            },
        });
    }
}
