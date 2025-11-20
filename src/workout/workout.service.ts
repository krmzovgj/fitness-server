import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Injectable()
export class WorkoutService {
    constructor(private prisma: PrismaService) {}

    async createWorkout(dto: CreateWorkoutDto) {
        const client = await this.prisma.user.findUnique({
            where: {
                id: dto.clientId,
                role: 'CLIENT',
            },
        });

        if (!client) {
            throw new NotFoundException('Client not found');
        }

        return await this.prisma.workout.create({
            data: {
                name: `${client.firstName}'s Workout`,
                clientId: client.id,
            },
        });
    }

    async getClientsWorkout(clientId: number) {
        if (!clientId) {
            throw new BadRequestException('Client id is required');
        }

        return await this.prisma.workout.findUnique({
            where: {
                clientId
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
}
