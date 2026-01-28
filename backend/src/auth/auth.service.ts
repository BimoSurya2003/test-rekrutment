import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) {}

    async register(data) {
        const hashed = await bcrypt.hash(data.password, 10);

        const user = await this.prisma.user.create({
            data: {
            name: data.name,
            email: data.email,
            password: hashed,
            },
        });

        const { password, ...result } = user;
        return result;
    }

    async login(data) {
        const user = await this.prisma.user.findUnique({
        where: { email: data.email }
        });

        if (!user) throw new Error('User not found');

        const match = await bcrypt.compare(data.password, user.password);
        if (!match) throw new Error('Wrong password');

        const token = this.jwt.sign({
        id: user.id,
        email: user.email
        });

        return { access_token: token };
    }
}
