/*
 * Represents a Use Case
 */

export interface IUseCase<T> {
  command(args?: unknown): Promise<T | T[] | void>;
}
