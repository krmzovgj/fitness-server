import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { WorkoutExerciseService } from './workout-exercise.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../generated/client/enums';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/update-workout-exercise.dto';

@Controller('workout-exercise')
export class WorkoutExerciseController {
    constructor(private workoutExerciseService: WorkoutExerciseService) {}

    @Post(':workoutId')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.TRAINER)
    createWorkoutExercise(
        @Param('workoutId') workoutId: string,
        @Body() dto: CreateWorkoutExerciseDto,
    ) {
        return this.workoutExerciseService.createWorkoutExercise(
            workoutId,
            dto,
        );
    }

    @Put(':workoutExerciseId')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.TRAINER)
    updateWorkoutExercise(
        @Param('workoutExerciseId') workoutExerciseId: string,
        @Body() dto: UpdateWorkoutExerciseDto,
    ) {
    return this.workoutExerciseService.updateWorkoutExercise(
            workoutExerciseId,
            dto,
        );
    }

    @Delete(':workoutExerciseId')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.TRAINER)
    deleteWorkoutExercise(
        @Param('workoutExerciseId') workoutExerciseId: string,
    ) {
        return this.workoutExerciseService.deleteWorkoutExercise(
            workoutExerciseId,
        );
    }
}
