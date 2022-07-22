import 'reflect-metadata';

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
} from '../../src/framework/Decorators';

describe('Decorators', () => {
  it('should decorate with @Controller a class with HTTP methods', () => {
    @Controller
    class ControllerClass {
      @Get()
      get() {}

      @Post()
      post() {}

      @Put('/:id')
      put() {}

      @Delete('/:id')
      delete() {}

      otherMethod() {}
    }

    const controllerInstance = new ControllerClass();

    expect(controllerInstance.get).toBeDefined();
    expect(controllerInstance.otherMethod).toBeDefined();

    expect(Reflect.get(controllerInstance, 'router')).toBeDefined();
    expect(Reflect.get(controllerInstance, 'router').get).toBeDefined();
    expect(Reflect.get(controllerInstance, 'router').post).toBeDefined();
    expect(Reflect.get(controllerInstance, 'router').put).toBeDefined();
    expect(Reflect.get(controllerInstance, 'router').delete).toBeDefined();
    expect(
      Reflect.get(controllerInstance, 'router').otherMethod
    ).not.toBeDefined();
  });

  describe('@Post', () => {
    @Controller
    class ControllerClass {
      @Post('/:param')
      post(): Promise<boolean> {
        return Promise.resolve(true);
      }

      @Post()
      postError(): Promise<boolean> {
        throw new Error('Post Error');
      }

      otherMethod() {}
    }
    const controllerInstance = new ControllerClass();

    it('should decorate with @Post a controller method', () => {
      const actionSymbol = Symbol.for('http_action') as unknown as string;
      const paramsSymbol = Symbol.for('params') as unknown as string;

      const {[actionSymbol]: action, [paramsSymbol]: params} =
        Object.getOwnPropertyDescriptors(controllerInstance.post);

      expect(controllerInstance.post).toBeDefined();
      expect(action.value).toBe('post');
      expect(params.value).toBe('/:param');
    });

    it('should execute a post method successfully', async () => {
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

      await Reflect.apply(controllerInstance.post, controllerInstance, [
        req,
        res,
      ]);

      expect(statusMock).toBeCalledWith(201);
      expect(jsonMock).toBeCalledWith(true);
    });

    it('should fail with http 500 when calling a post method', async () => {
      const req = {};
      const sendMock = jest.fn();
      const statusMock = jest.fn().mockImplementation(() => {
        return {
          send: sendMock,
        };
      });
      const res = {
        status: statusMock,
        send: sendMock,
      };

      await Reflect.apply(controllerInstance.postError, controllerInstance, [
        req,
        res,
      ]);

      expect(statusMock).toBeCalledWith(500);
      expect(sendMock).toBeCalledWith('Post Error');
    });
  });

  describe('@Put', () => {
    @Controller
    class ControllerClass {
      @Put('/:id')
      put(): Promise<boolean> {
        return Promise.resolve(true);
      }

      @Put()
      putError(): Promise<boolean> {
        throw new Error('Put Error');
      }

      otherMethod() {}
    }
    const controllerInstance = new ControllerClass();

    it('should decorate with @Put a controller method', () => {
      const actionSymbol = Symbol.for('http_action') as unknown as string;
      const paramsSymbol = Symbol.for('params') as unknown as string;

      const {[actionSymbol]: action, [paramsSymbol]: params} =
        Object.getOwnPropertyDescriptors(controllerInstance.put);

      expect(controllerInstance.put).toBeDefined();
      expect(action.value).toBe('put');
      expect(params.value).toBe('/:id');
    });

    it('should execute a put method successfully', async () => {
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

      await Reflect.apply(controllerInstance.put, controllerInstance, [
        req,
        res,
      ]);

      expect(statusMock).toBeCalledWith(200);
      expect(jsonMock).toBeCalledWith(true);
    });

    it('should fail with http 500 when calling a put method', async () => {
      const req = {};
      const sendMock = jest.fn();
      const statusMock = jest.fn().mockImplementation(() => {
        return {
          send: sendMock,
        };
      });
      const res = {
        status: statusMock,
        send: sendMock,
      };

      await Reflect.apply(controllerInstance.putError, controllerInstance, [
        req,
        res,
      ]);

      expect(statusMock).toBeCalledWith(500);
      expect(sendMock).toBeCalledWith('Put Error');
    });
  });

  describe('@Delete', () => {
    @Controller
    class ControllerClass {
      @Delete('/:id')
      delete(): Promise<boolean> {
        return Promise.resolve(true);
      }

      @Delete()
      deleteError(): Promise<boolean> {
        throw new Error('Delete Error');
      }

      otherMethod() {}
    }
    const controllerInstance = new ControllerClass();

    it('should decorate with @Delete a controller method', () => {
      const actionSymbol = Symbol.for('http_action') as unknown as string;
      const paramsSymbol = Symbol.for('params') as unknown as string;

      const {[actionSymbol]: action, [paramsSymbol]: params} =
        Object.getOwnPropertyDescriptors(controllerInstance.delete);

      expect(controllerInstance.delete).toBeDefined();
      expect(action.value).toBe('delete');
      expect(params.value).toBe('/:id');
    });

    it('should execute a delete method successfully', async () => {
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

      await Reflect.apply(controllerInstance.delete, controllerInstance, [
        req,
        res,
      ]);

      expect(statusMock).toBeCalledWith(200);
      expect(jsonMock).toBeCalledWith(true);
    });

    it('should fail with http 500 when calling a delete method', async () => {
      const req = {};
      const sendMock = jest.fn();
      const statusMock = jest.fn().mockImplementation(() => {
        return {
          send: sendMock,
        };
      });
      const res = {
        status: statusMock,
        send: sendMock,
      };

      await Reflect.apply(controllerInstance.deleteError, controllerInstance, [
        req,
        res,
      ]);

      expect(statusMock).toBeCalledWith(500);
      expect(sendMock).toBeCalledWith('Delete Error');
    });
  });

  describe('@Get', () => {
    @Controller
    class ControllerClass {
      @Get()
      get(): Promise<boolean> {
        return Promise.resolve(true);
      }

      @Get()
      getError(): Promise<boolean> {
        throw new Error('Get Error');
      }

      otherMethod() {}
    }
    const controllerInstance = new ControllerClass();

    it('should decorate with @Get a controller method', () => {
      const actionSymbol = Symbol.for('http_action') as unknown as string;
      const paramsSymbol = Symbol.for('params') as unknown as string;

      const {[actionSymbol]: action, [paramsSymbol]: params} =
        Object.getOwnPropertyDescriptors(controllerInstance.get);

      expect(controllerInstance.get).toBeDefined();
      expect(action.value).toBe('get');
      expect(params.value).toBe('/');
    });

    it('should execute a delete method successfully', async () => {
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

      await Reflect.apply(controllerInstance.get, controllerInstance, [
        req,
        res,
      ]);

      expect(statusMock).toBeCalledWith(200);
      expect(jsonMock).toBeCalledWith(true);
    });

    it('should fail with http 500 when calling a delete method', async () => {
      const req = {};
      const sendMock = jest.fn();
      const statusMock = jest.fn().mockImplementation(() => {
        return {
          send: sendMock,
        };
      });
      const res = {
        status: statusMock,
        send: sendMock,
      };

      await Reflect.apply(controllerInstance.getError, controllerInstance, [
        req,
        res,
      ]);

      expect(statusMock).toBeCalledWith(500);
      expect(sendMock).toBeCalledWith('Get Error');
    });
  });
});
