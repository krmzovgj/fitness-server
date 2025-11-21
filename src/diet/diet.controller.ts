import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from '@nestjs/common';
import { DietService } from './diet.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateDietDto } from './dto/create-diet.dto';

@Controller('diet')
export class DietController {
    constructor(private dietService: DietService) {}

    @Post()
    @UseGuards(AuthGuard)
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
