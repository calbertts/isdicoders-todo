import 'reflect-metadata';

import {MemoryTaskRepositoy} from '../../src/framework/MemoryTaskRepository';
import {Task} from '../../src/domain/Task';
import {TaskNotFound} from '../../src/domain/TaskNotFound';

describe('MemoryTaskRepositoy', () => {
  const memoryTaskRepositoy = new MemoryTaskRepositoy();

  beforeEach(async () => {
    await memoryTaskRepositoy.clear();
  });

  it('should create a task', async () => {
    const task: Task = {
      id: '',
      title: 'Task 1',
      status: 'PENDING',
      description: 'Description 1',
    };

    const taskCreated = await memoryTaskRepositoy.create(task);

    expect(taskCreated.id).toBeDefined();
  });

  it('should return all the tasks', async () => {
    const task: Task = {
      id: '',
      title: 'Task 1',
      status: 'PENDING',
      description: 'Description 1',
    };

    await memoryTaskRepositoy.create(task);
    const allTasks = await memoryTaskRepositoy.getAll();

    expect(allTasks.length).toBe(1);
  });

  it('should return a task by ID', async () => {
    const task: Task = {
      id: '',
      title: 'Task 1',
      status: 'PENDING',
      description: 'Description 1',
    };

    const createdTask = await memoryTaskRepositoy.create(task);
    const taskFound = await memoryTaskRepositoy.get(createdTask.id);

    expect(taskFound.id).toBe(createdTask.id);
  });

  it('should fail when a task is not found', async () => {
    await expect(memoryTaskRepositoy.get('non-existing-task')).rejects.toThrow(
      TaskNotFound
    );
  });

  it('should update a task', async () => {
    const task: Task = {
      id: '',
      title: 'Task N',
      status: 'PENDING',
      description: 'Description N',
    };

    const createdTaskFirst = await memoryTaskRepositoy.create(task);
    const createdTaskSecond = await memoryTaskRepositoy.create(task);

    const nonUpdatedTask = await memoryTaskRepositoy.get(createdTaskFirst.id);

    createdTaskSecond.status = 'DONE';
    const updatedTask = await memoryTaskRepositoy.update(
      createdTaskSecond.id,
      createdTaskSecond
    );

    expect(nonUpdatedTask.status).toBe('PENDING');
    expect(updatedTask.status).toBe('DONE');
  });

  it('should fail when updating a task is not found', async () => {
    await expect(memoryTaskRepositoy.update('non-existing-task', {} as Task)).rejects.toThrow(
      TaskNotFound
    );
  });

  it('should delete a task', async () => {
    const task: Task = {
      id: '',
      title: 'Task 1',
      status: 'PENDING',
      description: 'Description 1',
    };

    const createdTask = await memoryTaskRepositoy.create(task);

    await memoryTaskRepositoy.delete(createdTask.id);
    await expect(memoryTaskRepositoy.get(createdTask.id)).rejects.toThrow(
      TaskNotFound
    );
  });

  it('should fail when deleting a task is not found', async () => {
    await expect(memoryTaskRepositoy.delete('non-existing-task')).rejects.toThrow(
      TaskNotFound
    );
  });
});
