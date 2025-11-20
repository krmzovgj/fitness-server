import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Injectable()
export class ExerciseService {
    constructor(private prismaService: PrismaService) {}

    async createExercise(dto: CreateExerciseDto) {
        return await this.prismaService.exercise.create({
            data: {
                name: dto.name,
                sets: dto.sets,
                reps: dto.reps,
                day: dto.day,
                workoutId: dto.workoutId
            }
        })
    }
}
