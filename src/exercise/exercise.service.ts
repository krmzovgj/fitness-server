import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/client/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExerciseService {
    constructor(private prisma: PrismaService) {}

    async createExercise(dto: CreateExerciseDto) {
        return await this.prisma.exercise.create({
            data: {
                name: dto.name,
            },
        });
    }

    async getAllExercises(search?: string) {
        const where: Prisma.ExerciseWhereInput = search
            ? { name: { contains: search, mode: 'insensitive' } }
            : {};

        return await this.prisma.exercise.findMany({
            where,
            take: 10,
            orderBy: { name: 'asc' },
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
