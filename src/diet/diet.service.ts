import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDietDto } from './dto/create-diet.dto';

@Injectable()
export class DietService {
    constructor(private prisma: PrismaService) {}

    async createDiet(dto: CreateDietDto) {
        const client = await this.prisma.user.findUnique({
            where: {
                id: dto.clientId,
            },
        });

        if (!client) {
            throw new NotFoundException('Client not found');
        }

        return await this.prisma.diet.create({
            data: {
                name: `${client?.firstName}'s Diet`,
                clientId: dto.clientId,
            },
        });
    }

    async getClientsDiet(clientId: number) {
        if (!clientId) {
            throw new BadRequestException('Client id is required');
        }

        const client = await this.prisma.diet.findUnique({
            where: {
                clientId,
            },
        });

        if (!client) {
            throw new NotFoundException('Client not found');
        }

        return await this.prisma.diet.findUnique({
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
