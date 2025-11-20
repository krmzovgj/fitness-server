import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MealService } from './meal.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateMealDto } from './dto/create-meal.dto';

@Controller('meal')
export class MealController {
    constructor(private mealService: MealService) {}

    @Post()
    @UseGuards(AuthGuard)
    createMeal(@Body() dto: CreateMealDto) {
        return this.mealService.createMeal(dto)
    }
}
