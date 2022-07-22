/*
 * Contains all Task Use Cases
 */

import {IGenericRepository} from '../domain/IGenericRepository';
import {Task} from '../domain/Task';
import {GetTaskList} from './actions/GetTaskList';
import {GetTask} from './actions/GetTask';
import {CreateTask} from './actions/CreateTask';
import {UpdateTask} from './actions/UpdateTask';
import {DeleteTask} from './actions/DeleteTask';

export default class TaskUseCases {
  taskRepository: IGenericRepository<Task>;

  constructor(taskRepository: IGenericRepository<Task>) {
    this.taskRepository = taskRepository;
  }

  getTaskList(): Promise<Array<Task>> {
    return new GetTaskList(this.taskRepository).command();
  }

  getTask(id: string): Promise<Task> {
    return new GetTask(this.taskRepository).command(id);
  }

  createTask(task: Task): Promise<Task> {
    return new CreateTask(this.taskRepository).command(task);
  }

  updateTask(id: string, task: Task): Promise<Task> {
    return new UpdateTask(this.taskRepository).command({id, task});
  }

  deleteTask(id: string): Promise<void> {
    return new DeleteTask(this.taskRepository).command(id);
  }
}
