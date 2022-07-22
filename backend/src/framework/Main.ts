import 'reflect-metadata';

import ControllerBootstrap from './ControllerBootstrap';
import {modules} from './Modules';

const PORT = Number(process.env.PORT) || 5001;
new ControllerBootstrap(PORT, modules).start();
