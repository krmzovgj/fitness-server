import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MealType } from 'src/generated/client/enums';

export class CreateMealDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNumber()
    cal?: number;

    @IsNumber()
    protein?: number;

    @IsNumber()
    carbs?: number;

    @IsNumber()
    fats?: number;

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
