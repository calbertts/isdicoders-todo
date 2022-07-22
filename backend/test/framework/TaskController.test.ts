import {TaskController} from '../../src/framework/TaskController';
import {TaskNotFound} from '../../src/domain/TaskNotFound';
import TaskUseCases from '../../src/application/TaskUseCases';
import {MemoryTaskRepositoy} from '../../src/framework/MemoryTaskRepository';

jest.mock('../../src/application/TaskUseCases');

describe('TaskController && UseCases', () => {
  const taskUseCasesMock = new TaskUseCases(
    new MemoryTaskRepositoy()
  ) as jest.Mocked<TaskUseCases>;
  const taskController = new TaskController(taskUseCasesMock);

  it('should create a task', async () => {
    const req = {
      body: {
        id: '',
        title: 'Task 1',
        status: 'PENDING',
        description: 'Description 1',
      },
    };
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockImplementation(() => {
      return {
        json: jsonMock,
      };
    });
    const res = {
      json: jsonMock,
      status: statusMock,
    };

    await Reflect.apply(taskController.createTask, taskController, [req, res]);

    expect(statusMock).toBeCalledWith(201);
    expect(jsonMock).toBeCalled();
    expect(taskUseCasesMock.createTask).toBeCalledWith(req.body);
  });

  it('should return all the tasks', async () => {
    const req = {};
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockImplementation(() => {
      return {
        json: jsonMock,
      };
    });
    const res = {
      status: statusMock,
    };

    await Reflect.apply(taskController.getTaskList, taskController, [req, res]);

    expect(statusMock).toBeCalledWith(200);
    expect(jsonMock).toBeCalled();
    expect(taskUseCasesMock.getTaskList).toBeCalledWith();
  });

  it('should return a task by ID', async () => {
    const req = {
      params: {
        id: 'any-id',
      },
    };
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockImplementation(() => {
      return {
        json: jsonMock,
      };
    });
    const res = {
      status: statusMock,
    };

    await Reflect.apply(taskController.getTask, taskController, [req, res]);

    expect(statusMock).toBeCalledWith(200);
    expect(jsonMock).toBeCalled();
    expect(taskUseCasesMock.getTask).toBeCalledWith(req.params.id);
  });

  it('should fail when a task is not found', async () => {
    const req = {
      params: {
        id: 'any-id',
      },
    };
    const sendMock = jest.fn();
    const statusMock = jest.fn().mockImplementation(() => {
      return {
        send: sendMock,
      };
    });
    const res = {
      status: statusMock,
    };

    taskUseCasesMock.getTask.mockRejectedValue(new TaskNotFound('any-id'));

    await Reflect.apply(taskController.getTask, taskController, [req, res]);

    expect(statusMock).toBeCalledWith(500);
    expect(sendMock).toBeCalled();
    expect(taskUseCasesMock.getTask).toBeCalledWith(req.params.id);
  });

  it('should update a task', async () => {
    const req = {
      params: {
        id: 'any-id',
      },
      body: {
        task: {
          title: 'Task 1',
          status: 'PENDING',
          description: 'Description 1',
        },
      },
    };
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockImplementation(() => {
      return {
        json: jsonMock,
      };
    });
    const res = {
      status: statusMock,
    };

    await Reflect.apply(taskController.updateTask, taskController, [req, res]);

    expect(statusMock).toBeCalledWith(200);
    expect(jsonMock).toBeCalled();
    expect(taskUseCasesMock.updateTask).toBeCalledWith(req.params.id, req.body);
  });

  it('should delete a task', async () => {
    const req = {
      params: {
        id: 'any-id',
      },
    };
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockImplementation(() => {
      return {
        json: jsonMock,
      };
    });
    const res = {
      status: statusMock,
    };

    await Reflect.apply(taskController.deleteTask, taskController, [req, res]);

    expect(statusMock).toBeCalledWith(200);
    expect(jsonMock).toBeCalled();
    expect(taskUseCasesMock.deleteTask).toBeCalledWith(req.params.id);
  });
});
