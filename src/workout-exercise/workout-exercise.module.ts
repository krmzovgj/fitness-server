import { Module } from '@nestjs/common';
import { WorkoutExerciseService } from './workout-exercise.service';
import { WorkoutExerciseController } from './workout-exercise.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [WorkoutExerciseService],
    controllers: [WorkoutExerciseController],
})
export class WorkoutExerciseModule {}
