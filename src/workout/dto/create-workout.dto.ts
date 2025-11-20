import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateWorkoutDto {
    @IsNumber()
    @IsNotEmpty()
    clientId: number
}