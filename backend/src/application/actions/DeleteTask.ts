/**
 * Deletes a Task
 */

import {IGenericRepository} from '../../domain/IGenericRepository';
import {Task} from '../../domain/Task';
import {IUseCase} from '../IUseCase';

export class DeleteTask implements IUseCase<Task> {
  repository: IGenericRepository<Task>;

  constructor(repository: IGenericRepository<Task>) {
    this.repository = repository;
  }

  command(id: string): Promise<void> {
    return Promise.resolve(this.repository.delete(id));
  }
}
