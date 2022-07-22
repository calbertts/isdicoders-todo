/**
 * Decorators that are used to decorate a class with HTTP methods.
 */

import * as express from 'express';
import {Request, Response} from 'express';

/**
 * Decorator for Get methods in a controller
 *
 * @param params Endpoint params
 * @returns {function}
 */
export function Get(params?: string): Function {
  return function (
    _target: Object,
    _methodName: string,
    descriptor: PropertyDescriptor
  ) {
    const original: Function = descriptor.value;
    descriptor.value = async function _get(req: Request, res: Response) {
      try {
        console.log('GET', req.url, `params=[${JSON.stringify(req.params)}]`, `query=[${JSON.stringify(req.query)}]`);

        const object: unknown = await original.apply(this, [req.params, req.query]);
        res.status(200).json(object);
      } catch (err) {
        const message: string = (err as Error).message;
        res.status(500).send(message);
      }
    };

    const http_action_symbol = Symbol.for('http_action');
    const http_params_symbol = Symbol.for('params');

    descriptor.value[http_action_symbol] = 'get';
    descriptor.value[http_params_symbol] = params || '/';

    return descriptor;
  };
}

/**
 * Decorator for Put methods in a controller
 *
 * @param params Endpoint params
 * @returns {function}
 */
export function Put(params?: string): Function {
  return function (
    _target: Object,
    _methodName: string,
    descriptor: PropertyDescriptor
  ) {
    const original: Function = descriptor.value;
    descriptor.value = async function _put(req: Request, res: Response) {
      try {
        console.log('PUT', req.url, `params=[${JSON.stringify(req.params)}]`, `body=[${JSON.stringify(req.body)}]`, `query=[${JSON.stringify(req.query)}]`);

        const object: unknown = await original.apply(this, [
          req.params,
          req.body,
          req.query,
        ]);
        res.status(200).json(object);
      } catch (err) {
        const message: string = (err as Error).message;
        res.status(500).send(message);
      }
    };

    const http_action_symbol = Symbol.for('http_action');
    const http_params_symbol = Symbol.for('params');

    descriptor.value[http_action_symbol] = 'put';
    descriptor.value[http_params_symbol] = params || '/';

    return descriptor;
  };
}

/**
 * Decorator for Delete methods in a controller
 *
 * @param params Endpoint params
 * @returns {function}
 */
export function Delete(params?: string): Function {
  return function (
    _target: Object,
    _methodName: string,
    descriptor: PropertyDescriptor
  ) {
    const original: Function = descriptor.value;
    descriptor.value = async function _delete(req: Request, res: Response) {
      try {
        console.log('DELETE', req.url, `params=[${JSON.stringify(req.params)}]`, `query=[${JSON.stringify(req.query)}]`);

        const object: unknown = await original.apply(this, [req.params, req.query]);
        res.status(200).json(object);
      } catch (err) {
        const message: string = (err as Error).message;
        res.status(500).send(message);
      }
    };

    const http_action_symbol = Symbol.for('http_action');
    const http_params_symbol = Symbol.for('params');

    descriptor.value[http_action_symbol] = 'delete';
    descriptor.value[http_params_symbol] = params || '/';

    return descriptor;
  };
}

/**
 * Decorator for Post methods in a controller
 *
 * @param params Endpoint params
 * @returns {function}
 */
export function Post(params?: string): Function {
  return function (
    _target: Object,
    _methodName: string,
    descriptor: PropertyDescriptor
  ) {
    const original: Function = descriptor.value;
    descriptor.value = async function _post(req: Request, res: Response) {
      try {
        console.log('POST', req.url, `body=[${JSON.stringify(req.body)}]`, `params=[${JSON.stringify(req.params)}]`);

        const response: unknown = await original.apply(this, [req.body, req.params]);
        res.status(201).json(response);
      } catch (err) {
        const message: string = (err as Error).message;
        res.status(500).send(message);
      }
    };

    const http_action_symbol = Symbol.for('http_action');
    const http_params_symbol = Symbol.for('params');

    descriptor.value[http_action_symbol] = 'post';
    descriptor.value[http_params_symbol] = params;

    return descriptor;
  };
}

/**
 * Decorator for controllers
 *
 * @param target Class to be decorated
 */
export function Controller(target: any) {
  return new Proxy(target, {
    construct(clz, args) {
      const instance = Reflect.construct(clz, args);
      instance.router = express.Router();

      for (const method of Object.getOwnPropertyNames(target.prototype)) {
        const actionSymbol = Symbol.for('http_action') as unknown as string;
        const paramsSymbol = Symbol.for('params') as unknown as string;

        const {[actionSymbol]: action, [paramsSymbol]: params} =
          Object.getOwnPropertyDescriptors(target.prototype[method]);

        if (action && params) {
          instance.router[action.value](
            params.value || '/',
            instance[method].bind(instance)
          );
        }
      }

      return instance;
    },
  });
}
