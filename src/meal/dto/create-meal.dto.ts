import { Day, MealType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMealDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    cal: number;

    @IsNotEmpty()
    @IsNumber()
    protein: number;

    @IsNotEmpty()
    @IsEnum(MealType, {
        message:
            'Meal type must be either BREKFAST or LUNCH or DINNER or SNACK',
    })
    type: MealType;

    @IsNotEmpty()
    @IsEnum(Day, {
        message: 'Day must be between MONDAY and SUNDAY',
    })
    day: Day;

    @IsNotEmpty()
    @IsString()
    dietId: string;
}
