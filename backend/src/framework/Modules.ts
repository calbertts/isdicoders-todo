import {TaskController} from './TaskController';
import {MemoryTaskRepositoy} from './MemoryTaskRepository';
import TaskUseCases from '../application/TaskUseCases';

export type Module = {
  route: string;
  controller: Function;
  useCases: Function;
  repositories: {
    [key: string]: Function;
  };
};

export const modules = [
  {
    route: '/todo',
    controller: TaskController,
    useCases: TaskUseCases,
    repositories: {
      MemoryTaskRepositoy,
    },
  },
];
