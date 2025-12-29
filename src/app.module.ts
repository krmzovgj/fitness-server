import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { WorkoutModule } from './workout/workout.module';
import { ExerciseModule } from './exercise/exercise.module';
import { MealModule } from './meal/meal.module';
import { DietModule } from './diet/diet.module';
import { TenantModule } from './tenant/tenant.module';
import { WorkoutExerciseModule } from './workout-exercise/workout-exercise.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, WorkoutModule, ExerciseModule, MealModule, DietModule, TenantModule, WorkoutExerciseModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
