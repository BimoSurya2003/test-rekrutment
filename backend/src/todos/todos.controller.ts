import { Controller, UseGuards, Get, Post, Patch, Delete, Body, Req, Param } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { TodosService } from './todos.service';

@UseGuards(JwtGuard)
@Controller('todos')
export class TodosController {
    constructor(private todos: TodosService) {}

    @Post()
    create(@Req() req, @Body() body: { title: string; descriptions?: string }) {
        return this.todos.create(req.user.id, body);
    }

    @Get()
    findAll(@Req() req) {
        return this.todos.findAll(req.user.id);
    }

    @Patch(':id')
        updateTodo(
            @Req() req: any,
            @Param('id') id: string,
            @Body() body: { title?: string; descriptions?: string; is_done?: boolean },
        ) {
            return this.todos.update(+id, req.user.id, body);
    }

    @Delete(':id')
    delete(@Req() req, @Param('id') id: string) {
        return this.todos.delete(+id, req.user.id);
    }
}
