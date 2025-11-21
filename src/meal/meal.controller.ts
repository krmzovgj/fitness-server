import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Controller('meal')
export class MealController {
    constructor(private mealService: MealService) {}

    @Post()
    @UseGuards(AuthGuard)
    createMeal(@Body() dto: CreateMealDto) {
        return this.mealService.createMeal(dto);
    }

    @Put(':mealId')
    @UseGuards(AuthGuard)
    updateMeal(@Param('mealId') mealId: string, @Body() dto: UpdateMealDto) {
        return this.mealService.updateMeal(mealId, dto);
    }

    @Delete(':mealId')
    @UseGuards(AuthGuard)
    deleteMeal(@Param('mealId') mealId: string) {
        return this.mealService.deleteMeal(mealId);
    }
}
