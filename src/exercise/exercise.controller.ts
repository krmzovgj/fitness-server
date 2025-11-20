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
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExerciseService } from './exercise.service';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('exercise')
export class ExerciseController {
    constructor(private exerciseService: ExerciseService) {}

    @Post()
    @UseGuards(AuthGuard)
    createExercise(@Body() dto: CreateExerciseDto) {
        return this.exerciseService.createExercise(dto);
    }

    @Put(':exerciseId')
    @UseGuards(AuthGuard)
    updateExercise(
        @Param('exerciseId') exerciseId: string,
        @Body() dto: UpdateExerciseDto,
    ) {
        return this.exerciseService.updateExercise(exerciseId, dto);
    }

    @Delete(':exerciseId')
    @UseGuards(AuthGuard)
    deleteExercise(@Param('exerciseId') exerciseId: string) {
        return this.exerciseService.deleteExercise(exerciseId);
    }
}
