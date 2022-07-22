/**
 * Controller Bootstrap
 * Acts as a factory for the repositories, use cases and controllers
 */

import * as express from 'express';
import * as bodyParser from 'body-parser';
import {Module} from './Modules';

export default class ControllerBootstrap {
  port: number;
  app = express();
  modules: Array<Module>;

  constructor(port: number, modules: Array<Module>) {
    this.port = port;
    this.modules = modules;

    this.initializeMiddlewares();
    this.initializeRouters();
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
  }

  private initializeRouters(): void {
    for (const moduleConfig of this.modules) {
      const repositories = Object.values(moduleConfig.repositories).map(
        repoClass => Reflect.construct(repoClass, [])
      );

      const useCases = Reflect.construct(moduleConfig.useCases, repositories);
      const controller = Reflect.construct(moduleConfig.controller, [useCases]);
      const router = Reflect.get(controller, 'router');

      this.app.use(moduleConfig.route, router);
    }
  }

  start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server listening at http://localhost:${this.port}`);
    });
  }
}
