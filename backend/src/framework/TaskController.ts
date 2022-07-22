/**
 * ToDo Controller
 */

import {Task} from '../domain/Task';
import TaskUseCases from '../application/TaskUseCases';
import {Controller, Get, Post, Put, Delete} from './Decorators';

@Controller
export class TaskController {
  taskUseCases: TaskUseCases;

  constructor(taskUseCases: TaskUseCases) {
    this.taskUseCases = taskUseCases;
  }

  /**
   * Returns all the tasks
   *
   * @returns Promise<Array<Task>>
   */
  @Get()
  getTaskList(): Promise<Array<Task>> {
    return this.taskUseCases.getTaskList();
  }

  /**
   * Returns the corresponding task
   *
   * @returns Promise<Task>
   */
  @Get('/:id')
  getTask(params: {id: string}): Promise<Task> {
    return this.taskUseCases.getTask(params.id);
  }

  /**
   * Creates a new task
   *
   * @returns Promise<Array<Task>>
   */
  @Post()
  createTask(task: Task): Promise<Task> {
    return this.taskUseCases.createTask(task);
  }

  /**
   * Updates a task
   *
   * @returns Promise<Task>
   */
  @Put('/:id')
  updateTask(params: {id: string}, task: Task): Promise<Task> {
    return this.taskUseCases.updateTask(params.id, task);
  }

  /**
   * Removes a task
   *
   * @returns Promise<void>
   */
  @Delete('/:id')
  deleteTask(params: {id: string}): Promise<void> {
    return this.taskUseCases.deleteTask(params.id);
  }
}
