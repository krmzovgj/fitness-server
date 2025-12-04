import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MealType } from '../generated/client/enums';

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
    @IsString()
    dietId: string;
}
