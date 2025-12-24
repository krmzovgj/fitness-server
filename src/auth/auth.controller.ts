import {
    BadRequestException,
    Body,
    Controller,
    Post,
    Req,
} from '@nestjs/common';
import { type Request } from 'express';
import { AuthService } from './auth.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('create-account')
    createAccount(@Body() dto: CreateAccountDto) {
        return this.authService.createAccount(dto);
    }

    @Post('sign-in')
    signIn(@Req() req: Request, @Body() dto: SignInDto) {
        const tenantIdHeaders = req.headers['tenantid'];
        const tenantId = String(tenantIdHeaders);

        if (!tenantIdHeaders) {
            throw new BadRequestException('Tenant id is required');
        }

        return this.authService.signIn(dto, tenantId);
    }
}
