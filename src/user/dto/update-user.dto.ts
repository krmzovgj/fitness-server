import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';
import { Gender } from '../generated/client/enums';

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @IsNotEmpty()
    @IsNumber()
    height: number;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'Gender must be either MALE or FEMALE',
    })
    gender: Gender;
}
