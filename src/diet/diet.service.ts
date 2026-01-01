import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDietDto } from './dto/create-diet.dto';
import { UpdateDietDto } from './dto/update-diet.dto';

@Injectable()
export class DietService {
    constructor(private prisma: PrismaService) {}

    async createDiet(dto: CreateDietDto) {
        return await this.prisma.diet.create({
            data: {
                name: dto.name,
                day: dto.day,
                clientId: dto.clientId,
            },
        });
    }

    async getDietById(dietId: string) {
        if (!dietId) {
            throw new BadRequestException('Diet id is required');
        }

        return await this.prisma.diet.findUnique({
            where: {
                id: dietId,
            },
            include: {
                meals: true,
            },
        });
    }

    async getClientsDiet(clientId: number) {
        if (!clientId) {
            throw new BadRequestException('Client id is required');
        }

        return await this.prisma.diet.findMany({
            where: {
                clientId,
            },
            include: {
                meals: true,
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

    async updateDiet(dietId: string, dto: UpdateDietDto) {
        if (!dietId) {
            throw new BadRequestException('Diet id is required');
        }

        return await this.prisma.diet.update({
            where: {
                id: dietId,
            },
            data: {
                name: dto.name,
                day: dto.day,
                clientId: dto.clientId,
            },
        });
    }
}
