import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDietDto {
    @IsNotEmpty()
    @IsNumber()
    clientId: number;
}
