import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateWorkoutExerciseDto {
    @IsNotEmpty()
    @IsNumber()
    sets: number;

    @IsNotEmpty()
    @IsString()
    reps: string;

    @IsNotEmpty()
    @IsString()
    exerciseId: string;

    @IsNumber()
    @IsOptional()
    restBetweenSets?: number;

    @IsNumber()
    @IsOptional()
    restAfterExercise?: number;

    @IsString()
    @IsOptional()
    note?: string;
}
