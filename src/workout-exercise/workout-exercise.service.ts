import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/update-workout-exercise.dto';

@Injectable()
export class WorkoutExerciseService {
    constructor(private prisma: PrismaService) {}

    async createWorkoutExercise(
        workoutId: string,
        dto: CreateWorkoutExerciseDto,
    ) {
        if (!workoutId) {
            throw new BadRequestException('Workout id is required');
        }

        return await this.prisma.workoutExercise.create({
            data: {
                reps: dto.reps,
                sets: dto.sets,
                note: dto.note,
                exerciseId: dto.exerciseId,
                workoutId,
            },
        });
    }

    async updateWorkoutExercise(
        workoutExerciseId: string,
        dto: UpdateWorkoutExerciseDto,
    ) {
        if (!workoutExerciseId) {
            throw new BadRequestException('Workout id is required');
        }

        const updatedWorkoutExercise =
            await this.prisma.workoutExercise.updateMany({
                where: {
                    id: workoutExerciseId,
                },
                data: {
                    sets: dto.sets,
                    reps: dto.reps,
                    note: dto.note,
                    exerciseId: dto.exerciseId,
                },
            });

        if (updatedWorkoutExercise.count === 0) {
            throw new NotFoundException('Workout exercise not found');
        }

        return { message: 'Workout exercise updated' };
    }

    async deleteWorkoutExercise(workoutExerciseId: string) {
        if (!workoutExerciseId) {
            throw new NotFoundException('Workout exercise Id is required');
        }

        const deletedWorkoutExercise =
            await this.prisma.workoutExercise.deleteMany({
                where: {
                    id: workoutExerciseId,
                },
            });

        if (deletedWorkoutExercise.count === 0) {
            throw new NotFoundException('Workout exercise not found');
        }

        return { messsage: 'Workout exercise deleted' };
    }
}
