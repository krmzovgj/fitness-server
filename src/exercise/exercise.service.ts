import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ExerciseService {
    constructor(private prisma: PrismaService) {}

    async createExercise(dto: CreateExerciseDto) {
        return await this.prisma.exercise.create({
            data: {
                name: dto.name,
                sets: dto.sets,
                reps: dto.reps,
                workoutId: dto.workoutId,
            },
        });
    }

    async updateExercise(id: string, dto: UpdateExerciseDto) {
        if (!id) {
            throw new BadRequestException('Exercise id must be provided');
        }

        const exercise = await this.prisma.exercise.findUnique({
            where: {
                id,
            },
        });

        if (!exercise) {
            throw new NotFoundException('Exercise not found');
        }

        return await this.prisma.exercise.update({
            where: {
                id,
            },
            data: {
                name: dto.name,
                sets: dto.sets,
                reps: dto.reps,
                actualPerformance: dto.actualPerformance,
            },
        });
    }

    async deleteExercise(id: string) {
        if (!id) {
            throw new BadRequestException('Exercise id is required');
        }

        const exercise = await this.prisma.exercise.deleteMany({
            where: {
                id,
            },
        });

        if (exercise.count === 0) {
            throw new NotFoundException('Exercise not found');
        }

        return { message: 'Exercise deleted' };
    }
}
