import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor (private readonly taskService: TasksService){}

    @Get('/:id')
    public findOne(@Param('id') id: string):string{
        return `The number is ${id}`
    }
    @Get()
    public findAll():string{
        return "HI"
    }

    
}
