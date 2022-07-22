import {createMock} from 'ts-auto-mock';
import TaskUseCases from '../../src/application/TaskUseCases';
import {IGenericRepository} from '../../src/domain/IGenericRepository';
import {Task} from '../../src/domain/Task';

describe('TaskUseCases', () => {
  const repositoryMock = createMock<IGenericRepository<Task>>();
  const taskUseCases = new TaskUseCases(repositoryMock);

  it('should create and run a GetTaskList use case', async () => {
    await taskUseCases.getTaskList();
    expect(repositoryMock.getAll).toBeCalled();
  });

  it('should create and run a GetTask use case', async () => {
    await taskUseCases.getTask('fake-id');
    expect(repositoryMock.get).toBeCalled();
  });

  it('should create and run a CreateTask use case', async () => {
    await taskUseCases.createTask({
      id: '',
      title: 'Task 1',
      status: 'PENDING',
      description: 'Description 1',
    });
    expect(repositoryMock.create).toBeCalled();
  });

  it('should create and run a UpdateTask use case', async () => {
    await taskUseCases.updateTask('fake-id', {
      id: '',
      title: 'Task 1',
      status: 'PENDING',
      description: 'Description 1',
    });
    expect(repositoryMock.update).toBeCalled();
  });

  it('should create and run a DeleteTask use case', async () => {
    await taskUseCases.deleteTask('fake-id');
    expect(repositoryMock.delete).toBeCalled();
  });
});
