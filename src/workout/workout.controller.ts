import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Controller('workout')
export class WorkoutController {
    constructor(private workoutService: WorkoutService) {}

    @Post()
    @UseGuards(AuthGuard)
    createWorkout(@Body() dto: CreateWorkoutDto) {
        return this.workoutService.createWorkout(dto);
    }
}
