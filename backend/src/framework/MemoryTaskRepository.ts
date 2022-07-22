/**
 * Memory Task Repository Implementation
 */

import * as crypto from 'crypto';
import {IGenericRepository} from '../domain/IGenericRepository';
import {Task} from '../domain/Task';
import {TaskNotFound} from '../domain/TaskNotFound';

export class MemoryTaskRepositoy implements IGenericRepository<Task> {
  private db: Array<Task> = []; // In memory DB

  /**
   * Returns all the tasks
   *
   * @returns Promise<Array<Task>>
   */
  async getAll(): Promise<Array<Task>> {
    return this.db;
  }

  /**
   * Retrieves the task with the corresponding ID
   *
   * @param {string} id
   * @throws TaskNotFound
   */
  async get(id: string): Promise<Task> {
    const foundTask: Task | undefined = this.db.find(task => task.id === id);

    if (!foundTask) {
      throw new TaskNotFound(id);
    }

    return foundTask;
  }

  /**
   * Creates a new Task into de DB
   *
   * @param {Task} task
   * @returns Promise<Task>
   */
  async create(task: Task): Promise<Task> {
    const newTask: Task = {...task};
    newTask.id = crypto.randomUUID();

    this.db.push(newTask);
    return newTask;
  }

  /**
   * Updates a Task into de DB
   *
   * @param {string} id
   * @param {Task} newTask
   *
   * @throws TaskNotFound
   * @returns Promise<Task>
   */
  async update(id: string, newTask: Task): Promise<Task> {
    const foundTask: Task | undefined = this.db.find(task => task.id === id);

    if (!foundTask) {
      throw new TaskNotFound(id);
    }

    foundTask.title = newTask.title;
    foundTask.status = newTask.status;
    foundTask.description = newTask.description;

    return foundTask;
  }

  /**
   * Removes a task from the DB
   *
   * @param {string} id
   *
   * @throws TaskNotFound
   * @returns Promise<void>
   */
  async delete(id: string): Promise<void> {
    const foundTask: Task | undefined = this.db.find(task => task.id === id);

    if (!foundTask) {
      throw new TaskNotFound(id);
    }

    this.db = this.db.filter(task => task.id !== id);
  }

  /**
   * Clears the DB
   * @returns Promise<Task>
   */
  async clear(): Promise<void> {
    this.db = [];
  }
}
