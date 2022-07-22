import 'reflect-metadata';

import * as express from 'express';
import ControllerBootstrap from '../../src/framework/ControllerBootstrap';
import {Controller} from '../../src/framework/Decorators';

describe('ControllerBootstrap', () => {
  it('should build the dependencies from modules config', () => {
    const PORT = 5002;

    const controllerMock = Reflect.decorate([Controller], jest.fn());
    const useCasesMock = jest.fn();
    const repositoriesMock = jest.fn();

    new ControllerBootstrap(PORT, [
      {
        route: '/',
        controller: controllerMock,
        useCases: useCasesMock,
        repositories: {
          MemoryTaskRepository: repositoriesMock,
        },
      },
    ]);

    expect(controllerMock).toHaveBeenCalled();
    expect(useCasesMock).toHaveBeenCalled();
    expect(repositoriesMock).toHaveBeenCalled();
  });

  it('should start the server', () => {
    const PORT = 5003;

    const appMock = express();
    const appListenMock = jest.fn().mockImplementation((_PORT, fn) => {
      fn();
    });

    appMock.listen = appListenMock;

    const controllerBootstrap = new ControllerBootstrap(PORT, []);
    controllerBootstrap.app = appMock;

    controllerBootstrap.start();

    expect(appListenMock).toHaveBeenCalledWith(PORT, expect.anything());
  });
});
