import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('create-account')
    createAccount(@Body() dto: CreateAccountDto) {
        return this.authService.createAccount(dto);
    }

    @Post('sign-in')
    signIn(@Body() dto: SignInDto) {
        return this.authService.signIn(dto);
    }
}
