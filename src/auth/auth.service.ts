import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private prisma: PrismaService,
    ) {}

    async createAccount(dto: CreateAccountDto) {
        return this.userService.createUser(dto);
    }

    async signIn(dto: SignInDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        const match = await bcrypt.compare(dto.password, user.password);

        if (!match) {
            throw new BadRequestException('Invalid credentials');
        }

        const token = this.jwtService.sign({
            id: user.id,
            email: user.email,
        });

        return { token };
    }
}
