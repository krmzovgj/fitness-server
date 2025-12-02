import { Day } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDietDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEnum(Day, {
        message: 'Day must be between MONDAY and SUNDAY',
    })
    @IsNotEmpty()
    day: Day;

    @IsNotEmpty()
    @IsNumber()
    clientId: number;
}
