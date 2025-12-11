import { IsNotEmpty, IsString } from "class-validator";

export class CreateTenantDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    subdomain: string
}