import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Injectable()
export class WorkoutService {
    constructor(private prisma: PrismaService) {}

    async createWorkout(dto: CreateWorkoutDto) {
        const existing = await this.prisma.workout.findFirst({
            where: {
                day: dto.day,
                clientId: dto.clientId,
            },
        });

        if (existing) {
            throw new BadRequestException(
                `Workout already exists for ${dto.day}`,
            );
        }

        return await this.prisma.workout.create({
            data: {
                name: dto.name,
                day: dto.day,
                clientId: dto.clientId,
            },
        });
    }

    async getClientsWorkouts(clientId: number) {
        if (!clientId) {
            throw new BadRequestException('Client id is required');
        }

        return await this.prisma.workout.findMany({
            where: {
                clientId,
            },
        });
    }

    async getExercises(workoutId: string) {
        if (!workoutId) {
            throw new BadRequestException('Workout id is required');
        }

        return await this.prisma.exercise.findMany({
            where: {
                workoutId,
            },
        });
    }

    async updateWorkout(workoutId: string, dto: UpdateWorkoutDto) {
        if (!workoutId) {
            throw new BadRequestException('Workout id is required');
        }

        const updatedWorkout = await this.prisma.workout.update({
            where: {
                id: workoutId,
            },
            data: {
                name: dto.name,
                day: dto.day,
            },
        });

        if (!updatedWorkout) {
            throw new NotFoundException('Workout not found');
        }

        return updatedWorkout
    }
}
