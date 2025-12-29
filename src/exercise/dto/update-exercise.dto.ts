import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateExerciseDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
