import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Injectable()
export class WorkoutService {
    constructor(private prismaService: PrismaService) {}

    async createWorkout(dto: CreateWorkoutDto) {
        const client  = await this.prismaService.user.findUnique({
            where: {
                id: dto.clientId,
                role: 'CLIENT'
            }
        })

        if(!client) {
            throw new NotFoundException("Client not found")
        }

        return await this.prismaService.workout.create({
            data: {
                name: `${client.firstName}'s Workout`,
                clientId: client.id,
            }
        })
    }
}
