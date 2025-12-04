import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Day } from 'src/generated/client/enums';

export class UpdateWorkoutDto {
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
    clientId: number
}
