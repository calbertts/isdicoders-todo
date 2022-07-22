/**
 * Updates a Task
 */

import {IGenericRepository} from '../../domain/IGenericRepository';
import {Task} from '../../domain/Task';
import {IUseCase} from '../IUseCase';

export class UpdateTask implements IUseCase<Task> {
  repository: IGenericRepository<Task>;

  constructor(repository: IGenericRepository<Task>) {
    this.repository = repository;
  }

  command({id, task}: {id: string; task: Task}): Promise<Task> {
    return Promise.resolve(this.repository.update(id, task));
  }
}
