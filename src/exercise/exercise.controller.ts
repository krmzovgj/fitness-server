import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
    constructor(private exerciseService: ExerciseService) {}

    @Post()
    @UseGuards(AuthGuard)
    createExercise(@Body() dto: CreateExerciseDto) {
        return this.exerciseService.createExercise(dto)
    }
}
