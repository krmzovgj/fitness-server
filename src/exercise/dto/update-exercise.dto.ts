import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

    @IsString()
    @IsOptional()
    actualPerformance?: string | null;
}
