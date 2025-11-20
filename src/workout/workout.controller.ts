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

@Controller('workout')
export class WorkoutController {
    constructor(private workoutService: WorkoutService) {}

    @Post()
    @UseGuards(AuthGuard)
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
