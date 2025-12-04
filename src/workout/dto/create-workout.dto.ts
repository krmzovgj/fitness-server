import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Day } from '../generated/client/enums';

export class CreateWorkoutDto {
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
