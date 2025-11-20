import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMealDto } from './dto/create-meal.dto';

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
                day: dto.day,
                dietId: dto.dietId,
            },
        });
    }
}
