import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateAccountDto } from '../auth/dto/create-account.dto';
import { UserService } from './user.service';
import type { Request } from 'express';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../auth/roles.enum';
import { UpdateUserDto } from './dto/update-user.dto';

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

    @Get('client:tenantId')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.TRAINER)
    getClients(@Param('tenantId') tenantId: string) {
        return this.userService.getClients(tenantId);
    }

    @Get(':userId')
    @UseGuards(AuthGuard)
    getUserById(@Param('userId', ParseIntPipe) userId: number) {
        return this.userService.getUserById(userId);
    }

    @Put(':userId')
    @UseGuards(AuthGuard)
    updateUser(@Param('userId') userId: number, @Body() dto: UpdateUserDto) {
        return this.userService.updateUser(userId, dto);
    }

    @Delete(':userId')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.TRAINER)
    deleteClient(@Param('userId') userId: number) {
        return this.userService.deleteClient(userId);
    }
}
