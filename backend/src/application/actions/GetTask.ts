/**
 * Returns a single Task
 */

import {IGenericRepository} from '../../domain/IGenericRepository';
import {Task} from '../../domain/Task';
import {IUseCase} from '../IUseCase';

export class GetTask implements IUseCase<Task> {
  repository: IGenericRepository<Task>;

  constructor(repository: IGenericRepository<Task>) {
    this.repository = repository;
  }

  command(id: string): Promise<Task> {
    return Promise.resolve(this.repository.get(id));
  }
}
