import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TodosService {
    constructor(private prisma: PrismaService) {}

    create(userId: number, data: { title: string; descriptions?: string }) {
        return this.prisma.todo.create({
        data: {
            ...data,
            is_done: false,
            user_id: userId,
        },
        });
    }

    findAll(userId: number) {
        return this.prisma.todo.findMany({
        where: { user_id: userId },
        });
    }

    update(
    id: number,
    userId: number,
    data: { title?: string; descriptions?: string; is_done?: boolean },
    ) {
    return this.prisma.todo.updateMany({
        where: { id, user_id: userId },
        data,
    });
    }


    delete(id: number, userId: number) {
        return this.prisma.todo.deleteMany({
        where: { id, user_id: userId },
        });
    }
}
