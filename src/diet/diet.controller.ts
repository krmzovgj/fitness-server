import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { DietService } from './diet.service';
import { CreateDietDto } from './dto/create-diet.dto';
import { UpdateDietDto } from './dto/update-diet.dto';
import { UserRole } from '../generated/client/enums';

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

    @Put(':dietId')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.TRAINER)
    updateDiet(@Param('dietId') dietId: string, @Body() dto: UpdateDietDto) {
        return this.dietService.updateDiet(dietId, dto);
    }
}
