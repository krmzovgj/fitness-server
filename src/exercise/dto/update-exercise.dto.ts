import { Day } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateExerciseDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    reps: number;

    @IsNotEmpty()
    @IsNumber()
    sets: number;

    @IsNotEmpty()
    @IsEnum(Day, {
        message: 'Day must be between MONDAY and SUNDAY',
    })
    day: Day;
}
