import { AppConfig } from "./app-config";

export const ApiRoute = {
  Server: (AppConfig.Env.IsProd ? 'https://api.reactjs.aws.jammary.com' : 'http://localhost:4000'),
  Tasks: '/api/tasks',
  Task: '/api/tasks/id'
};
