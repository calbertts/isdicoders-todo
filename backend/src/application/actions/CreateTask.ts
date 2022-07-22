/**
 * Creates a new task
 */

import {IGenericRepository} from '../../domain/IGenericRepository';
import {Task} from '../../domain/Task';
import {IUseCase} from '../IUseCase';

export class CreateTask implements IUseCase<Task> {
  repository: IGenericRepository<Task>;

  constructor(repository: IGenericRepository<Task>) {
    this.repository = repository;
  }

  command(task: Task): Promise<Task> {
    return Promise.resolve(this.repository.create(task));
  }
}
