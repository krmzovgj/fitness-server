import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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
                    restDay: dto.restDay,
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

    async getWorkoutById(workoutId: string) {
        if (!workoutId) {
            throw new BadRequestException('Workout id is required');
        }

        return await this.prisma.workout.findUnique({
            where: {
                id: workoutId,
            },
            include: {
                workoutExercises: {
                    include: {
                        exercise: true,
                    },
                },
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
            include: {
                workoutExercises: {
                    include: {
                        exercise: true,
                    },
                },
            },
        });
    }

    async getWorkoutExercise(workoutId: string) {
        if (!workoutId) {
            throw new BadRequestException('Workout id is required');
        }

        return await this.prisma.workoutExercise.findMany({
            where: {
                workoutId,
            },
            include: {
                exercise: true,
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
                    restDay: dto.restDay,
                    note: dto.note,
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
