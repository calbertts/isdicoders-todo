/**
 * Returns all the tasks in the db
 */

import {IGenericRepository} from '../../domain/IGenericRepository';
import {Task} from '../../domain/Task';
import {IUseCase} from '../IUseCase';

export class GetTaskList implements IUseCase<Task> {
  repository: IGenericRepository<Task>;

  constructor(repository: IGenericRepository<Task>) {
    this.repository = repository;
  }

  command(): Promise<Array<Task>> {
    return Promise.resolve(this.repository.getAll());
  }
}
