import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { CreateAccountDto } from 'src/auth/dto/create-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { userPublicFields } from '../types/user-public-fields';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(dto: CreateAccountDto) {
        const existing = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (existing) {
            throw new BadRequestException(
                'User with this email already exists',
            );
        }

        const hash = await bcrypt.hash(
            dto.password,
            Number(process.env.SALT_OR_ROUNDS) || 12,
        );

        return await this.prisma.user.create({
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                weight: dto.weight,
                height: dto.height,
                age: dto.age,
                role: dto.role,
                gender: dto.gender,
                password: hash,
            },
            select: userPublicFields,
        });
    }

    async createClient(dto: CreateAccountDto) {
        const existing = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (existing) {
            throw new BadRequestException(
                'User with this email already exists',
            );
        }

        const hash = await bcrypt.hash(
            dto.password,
            Number(process.env.SALT_OR_ROUNDS) || 12,
        );

        const user = await this.prisma.user.create({
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                weight: dto.weight,
                height: dto.height,
                age: dto.age,
                role: dto.role,
                gender: dto.gender,
                password: hash,
            },
            select: userPublicFields,
        });

        return user;
    }

    async getUserById(id: number) {
        if (!id) {
            throw new BadRequestException('User id is required');
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
            select: userPublicFields,
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async getClients() {
        return await this.prisma.user.findMany({
            where: {
                role: 'CLIENT',
            },
            select: userPublicFields,
        });
    }

    async updateUser(userId: number, dto: UpdateUserDto) {
        if (!userId) {
            throw new BadRequestException('User id is required');
        }

        return await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                age: dto.age,
                gender: dto.gender,
                height: dto.height,
                weight: dto.weight,
            },
            select: userPublicFields,
        });
    }

    async deleteClient(userId: number) {
        if (!userId) {
            throw new BadRequestException('User id is required');
        }

        await this.prisma.user.delete({
            where: {
                id: userId,
            },
        });

        return { message: 'Client deleted' };
    }
}
