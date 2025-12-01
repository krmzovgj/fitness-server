import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { DietService } from './diet.service';

@Controller('diet')
export class DietController {
    constructor(private dietService: DietService) {}

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
