import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './task.model';
import { CreateTaskDto } from './create-task.dto';
import { findOneParams } from './find-one.params';
import { updateTaskStatusDto } from './udpate-task-status.dto';
import { UpdateTaskDto } from './update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  public findAll(): ITask[] {
    return this.taskService.findAll();
  }

  @Get('/:id')
  public findOne(@Param() params: findOneParams): ITask {
    const task = this.taskService.findOne(params.id);
    if (task) {
      return task;
    }
    throw new NotFoundException();
  }

  @Post()
  public create(@Body() createTask: CreateTaskDto) {
    return this.taskService.create(createTask);
  }

  @Patch(':id/status')
  public updateTaskStatus(
    @Param() params: findOneParams,
    @Body() body: updateTaskStatusDto,
  ): ITask {
    const task = this.findOneOrFail(params.id);
    task.status = body.status;
    return task;
  }

  @Patch(':id/taskUpdate')
  public updateWholeTask(
    @Param() params: findOneParams,
    @Body() updateTaskDto: UpdateTaskDto,
  ): ITask {
    const task = this.findOneOrFail(params.id);
    return this.taskService.updateTask(task, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteTask(@Param() params: findOneParams): void {
    const task = this.findOneOrFail(params.id);
    this.taskService.deleteTask(task.id);
  }

  private findOneOrFail(id: string) {
    const task = this.taskService.findOne(id);
    if (!task) {
      throw new NotFoundException();
    } else {
      return task;
    }
  }
}
