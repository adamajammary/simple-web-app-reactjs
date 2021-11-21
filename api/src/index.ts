import cors from 'cors';
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

import { AppConfig } from './const/app-config';
import { AppLabel } from './const/app-label';
import { AppRoute } from './const/app-route';
import { Task } from './models/Task';

let dbCollection: any;

const corsOptions = cors(AppConfig.Server.CorsOptions);
const expressApp  = express();
const dbClient    = new MongoClient(AppConfig.Db.Url);

expressApp.use(cors());
expressApp.use(express.json());

// GET /api/tasks[?sort=title[_desc]]	 Returns all tasks (optionally sorted)
expressApp.get(AppRoute.Tasks, corsOptions, (request, response) => {
  const url    = new URL(`http://localhost${request.url}`);
  let   sortBy = url.searchParams.get('sort');
  let   sortQuery;

  if (sortBy) {
    if (sortBy.endsWith('_desc')) {
      sortBy    = sortBy.substr(0, sortBy.length - 5);
      sortQuery = { [sortBy]: -1 };
    } else {
      sortQuery = { [sortBy]: 1 };
    }
  } else {
    sortQuery = { title: 1 };
  }

  dbCollection.find().sort(sortQuery).toArray().then((result: Task[]) => {
    response.status(200).send(result);
  }).catch((e: Error) => {
    response.status(500).send(`${AppLabel.Error.GetTasks}: ${e.message}`);
  });
});

// GET /api/tasks/:id  Returns the task with the specified ID if it exists
expressApp.get(AppRoute.Task, corsOptions, (request, response) => {
  const query = { _id: new ObjectId(request.params.id) };

  dbCollection.findOne(query).then((result: Task) => {
    response.status(200).send(result);
  }).catch((e: Error) => {
    response.status(500).send(`${AppLabel.Error.GetTask}: ${e.message}`);
  });
});

// POST /api/tasks  Adds a new task
expressApp.post(AppRoute.Tasks, corsOptions, (request, response) => {
  if (isValid(request.body)) {
    dbCollection.insertOne(request.body).then(() => {
      response.status(200).send(AppLabel.Success.AddTask);
    }).catch((e: Error) => {
      response.status(500).send(`${AppLabel.Error.AddTask}: ${e.message}`);
    });
  } else {
    response.status(500).send(`${AppLabel.Error.InvalidTask}: ${JSON.stringify(request.body)}`);
  }
});

// PUT /api/tasks/:id  Updates the task with the specified ID if it exists
expressApp.put(AppRoute.Task, corsOptions, (request, response) => {
  if (isValid(request.body)) {
    const query = { _id: new ObjectId(request.params.id) };

    dbCollection.updateOne(query, { $set: request.body }).then((result: any) => {
      response.status(200).send(`${AppLabel.Success.Updated} ${result.modifiedCount} ${AppLabel.Success.Documents}.`);
    }).catch((e: Error) => {
      response.status(500).send(`${AppLabel.Error.UpdateTask}: ${e.message}`);
    });
  } else {
    response.status(500).send(`${AppLabel.Error.InvalidTask}: ${JSON.stringify(request.body)}`);
  }
});

// DELETE	/api/tasks/:id  Deletes the task with the specified ID if it exists
expressApp.delete(AppRoute.Task, corsOptions, (request, response) => {
  const query = { _id: new ObjectId(request.params.id) };

  dbCollection.deleteOne(query).then((result: any) => {
    response.status(200).send(`${AppLabel.Success.Deleted} ${result.deletedCount} ${AppLabel.Success.Documents}.`);
  }).catch((e: Error) => {
    response.status(500).send(`${AppLabel.Error.DeleteTask}: ${e.message}`);
  });
});

dbClient.connect().then(() => {
  console.log(`${AppLabel.Success.DbConnect} '${AppConfig.Db.Url}'.`);

  expressApp.listen(AppConfig.Server.Port, () => {
    console.log(`${AppLabel.Success.ServerListen} ':${AppConfig.Server.Port}'.`);

    dbCollection = dbClient.db(AppConfig.Db.Name).collection(AppConfig.Db.Collection);

    if (!dbCollection) {
      console.error(`${AppLabel.Error.DbCollection} '${AppConfig.Db.Collection}'.`);
      cleanup(2);
    }
  });
}).catch(e => {
  console.error(`${AppLabel.Error.DbConnect} '${AppConfig.Db.Url}'.`, e);
  cleanup(1);
});

function isValid(task: Task): boolean {
  return (
    isValidMinLength(task.title, 3) && isValidMaxLength(task.title, 50) &&
    (!task.description || isValidMaxLength(task.description, 250)) &&
    isValidDate(task.date) &&
    isValidStatus(task.status)
  );
}

function isValidDate(value: string): boolean {
  return Boolean(value && value.match(/^\d{4}-\d{2}-\d{2}$/));
}

function isValidMaxLength(value: string, length: number): boolean {
  return Boolean(value && value.length <= length);
}

function isValidMinLength(value: string, length: number): boolean {
  return Boolean(value && value.length >= length);
}

function isValidStatus(value: string): boolean {
  const status = [ "N/A", "Not Started", "Started", "In Progress", "Almost Done", "Completed" ];

  return Boolean(value && status.includes(value));
}

function cleanup(exitCode?: number) {
  dbClient.close();
  process.exit(exitCode);
}

process.on('SIGINT',  cleanup);
process.on('SIGTERM', cleanup);
