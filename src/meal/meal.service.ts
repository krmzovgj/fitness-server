import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Injectable()
export class MealService {
    constructor(private prisma: PrismaService) {}

    async createMeal(dto: CreateMealDto) {
        return await this.prisma.meal.create({
            data: {
                name: dto.name,
                description: dto.description,
                cal: dto.cal,
                protein: dto.protein,
                type: dto.type,
                dietId: dto.dietId,
            },
        });
    }

    async updateMeal(mealId: string, dto: UpdateMealDto) {
        if (!mealId) {
            throw new BadRequestException('Meal id is required');
        }

        const meal = await this.prisma.meal.findUnique({
            where: {
                id: mealId,
            },
        });

        if (!meal) {
            throw new NotFoundException('Meal not found');
        }

        return await this.prisma.meal.update({
            where: {
                id: mealId,
            },
            data: {
                name: dto.name,
                description: dto.description,
                cal: dto.cal,
                protein: dto.protein,
                type: dto.type,
            },
        });
    }

    async deleteMeal(mealId: string) {
        if (!mealId) {
            throw new BadRequestException('Meal id is required');
        }

        const meal = await this.prisma.meal.deleteMany({
            where: {
                id: mealId,
            },
        });

        if (meal.count === 0) {
            throw new NotFoundException('Meal not found');
        }

        return { message: 'Meal deleted' };
    }
}
