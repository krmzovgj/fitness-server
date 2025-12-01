import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAccountDto } from 'src/auth/dto/create-account.dto';
import { UserService } from './user.service';
import type { Request } from 'express';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/roles.enum';

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
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.TRAINER)
    createClient(@Body() dto: CreateAccountDto) {
        return this.userService.createClient(dto);
    }

    @Get('client')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.TRAINER)
    getClients() {
        return this.userService.getClients();
    }

    @Get(':userId')
    @UseGuards(AuthGuard)
    getUserById(@Param('userId', ParseIntPipe) userId: number) {
        return this.userService.getUserById(userId);
    }
}
