import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExerciseDto {
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
    workoutId: string;
}
