import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateExerciseDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    reps: string;

    @IsNotEmpty()
    @IsNumber()
    sets: number;

    @IsNotEmpty()
    @IsString()
    actualPerformance: string;
}
