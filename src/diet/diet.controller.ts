import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { DietService } from './diet.service';
import { CreateDietDto } from './dto/create-diet.dto';

@Controller('diet')
export class DietController {
    constructor(private dietService: DietService) {}

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.TRAINER)
    createDiet(@Body() dto: CreateDietDto) {
        return this.dietService.createDiet(dto);
    }

    @Get(':clientId')
    @UseGuards(AuthGuard)
    getClientsDiet(@Param('clientId', ParseIntPipe) clientId: number) {
        return this.dietService.getClientsDiet(clientId);
    }

    @Get(':dietId/meal')
    @UseGuards(AuthGuard)
    getMeals(@Param('dietId') dietId: string) {
        return this.dietService.getMeals(dietId);
    }
}
