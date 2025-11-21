import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { WorkoutService } from './workout.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/roles.enum';

@Controller('workout')
export class WorkoutController {
    constructor(private workoutService: WorkoutService) {}

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.TRAINER)
    createWorkout(@Body() dto: CreateWorkoutDto) {
        return this.workoutService.createWorkout(dto);
    }

    @Get(':clientId')
    @UseGuards(AuthGuard)
    getClientsWorkout(@Param('clientId', ParseIntPipe) clientId: number) {
        return this.workoutService.getClientsWorkout(clientId);
    }

    @Get(':workoutId/exercise')
    @UseGuards(AuthGuard)
    getExercises(@Param('workoutId') workoutId: string) {
        return this.workoutService.getExercises(workoutId);
    }
}
