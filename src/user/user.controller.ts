import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAccountDto } from 'src/auth/dto/create-account.dto';
import { UserService } from './user.service';
import type { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('me')
    @UseGuards(AuthGuard)
    getMe(@Req() req: Request) {
        const userId = req.user.id;
        
        return this.userService.getUserById(userId);
    }

    @Post('client')
    @UseGuards(AuthGuard)
    createClient(@Body() dto: CreateAccountDto) {
        return this.userService.createUser(dto);
    }
}
