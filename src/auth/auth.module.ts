import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [
        PrismaModule,
        UserModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET!,
            signOptions: { expiresIn: '7d' },
        }),
    ],
    providers: [AuthService, AuthGuard],
    controllers: [AuthController],
    exports: [AuthGuard],
})
export class AuthModule {}
