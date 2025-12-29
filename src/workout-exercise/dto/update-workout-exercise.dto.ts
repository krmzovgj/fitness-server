import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}
