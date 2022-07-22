# ISDI Coders - ToDo

The core of the application will be in the backend, which is the skill I want to show.
The frontend is very basic and I haven't followed the best practices.

I've tried to follow a clean architecture approach:

![image](https://user-images.githubusercontent.com/1326651/180464333-13ccaf85-5ccf-41d3-9bba-d6396cd56e9a.png)

And also, I'm trying to show features like *metaprogramming* with typescript.

In terms of deployment, I've created a `docker-compose` file for running a small cluster with two containers:

1. Frontend (port 3002)
2. Backend (port 80 - not exposed to host)

```
+---------------------------------------------------------+
| HOST                                                    |
|                                                         |
|                                                         |
|      +------------------+      +-------------------+    |
|      |                  |      |                   |    |
|      | FRONTEND         |----->|  BACKEND          |    |
|      | :3002            |      |  :80              |    |
|      |                  |      |                   |    |
|      +------------------+      +-------------------+    |
|       BOUNDED TO :3002          PORT NOT EXPOSED        |
|                                 TO HOST                 |
|                                                         |
+---------------------------------------------------------+
```

## How to run unit tests

Just run the following command from the `/backend` folder:
```
npm test
```

A `coverage` folder will be created with the coverage report.


## How to execute the application

By using `docker-compose` execute the following command from the main folder:
```
docker-compose up
```

After the corresponding containers (backend and frontend) are created, go to: http://localhost:3002
