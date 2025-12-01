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
        try {
            return await this.prisma.workout.create({
                data: {
                    name: dto.name,
                    day: dto.day,
                    clientId: dto.clientId,
                },
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new BadRequestException(
                    `Another workout for ${dto.day} already exists for this client`,
                );
            }
        }
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
        try {
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

            return updatedWorkout;
        } catch (error) {
            return await this.prisma.workout.create({
                data: {
                    name: dto.name,
                    day: dto.day,
                    clientId: dto.clientId,
                },
            });
        }
    }
}
