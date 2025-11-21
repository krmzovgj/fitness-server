import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
    constructor(private exerciseService: ExerciseService) {}

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.TRAINER)
    createExercise(@Body() dto: CreateExerciseDto) {
        return this.exerciseService.createExercise(dto);
    }

    @Put(':exerciseId')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.TRAINER)
    updateExercise(
        @Param('exerciseId') exerciseId: string,
        @Body() dto: UpdateExerciseDto,
    ) {
        return this.exerciseService.updateExercise(exerciseId, dto);
    }

    @Delete(':exerciseId')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.TRAINER)
    deleteExercise(@Param('exerciseId') exerciseId: string) {
        return this.exerciseService.deleteExercise(exerciseId);
    }
}
