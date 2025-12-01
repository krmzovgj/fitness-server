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
import { AuthGuard } from 'src/auth/auth.guard';
import { WorkoutService } from './workout.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

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
    getClientsWorkouts(@Param('clientId', ParseIntPipe) clientId: number) {
        return this.workoutService.getClientsWorkouts(clientId);
    }

    @Get(':workoutId/exercise')
    @UseGuards(AuthGuard)
    getExercises(@Param('workoutId') workoutId: string) {
        return this.workoutService.getExercises(workoutId);
    }

    @Put(':workoutId')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.TRAINER)
    updateWorkout(
        @Param('workoutId') workoutId: string,
        @Body() dto: UpdateWorkoutDto,
    ) {
        return this.workoutService.updateWorkout(workoutId, dto);
    }
}
