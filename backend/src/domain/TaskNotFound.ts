/**
 * Represents the exception when a Task hasn't been found
 */

export class TaskNotFound extends Error {
  constructor(taskId: string) {
    super(`Task "${taskId}" not found`);
  }

  toString(): string {
    return this.message;
  }
}
