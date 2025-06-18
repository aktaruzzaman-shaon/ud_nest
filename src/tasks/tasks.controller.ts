import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './task.model';

@Controller('tasks')
export class TasksController {

    constructor (private readonly taskService: TasksService){}

   
    @Get()
    public findAll():ITask[]{
        return this.findAll();
    }

     @Get('/:id')
    public findOne(@Param('id') id: string):string{
        const task = this.findOne(id);
        if(task){
            return task
        }
        throw new NotFoundException();
    }
    
}
