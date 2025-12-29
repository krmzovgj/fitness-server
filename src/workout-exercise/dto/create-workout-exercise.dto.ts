import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWorkoutExerciseDto {
    @IsNotEmpty()
    @IsNumber()
    sets: number;

    @IsNotEmpty()
    @IsString()
    reps: string;

    @IsNotEmpty()
    @IsString()
    exerciseId: string;

    @IsString()
    @IsOptional()
    note?: string
}
