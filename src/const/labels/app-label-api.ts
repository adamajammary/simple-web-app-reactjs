import { ApiRoute } from "../api-route";

export const AppLabelAPI = {
  Header: 'Simple REST Web API',
  Title: 'Tasks API',
  Usage1: 'You can use',
  Usage2: 'or',
  Usage3: 'to test the API from the client side',
  Actions: [{
    Description: 'Returns all tasks (optionally sorted)',
    Method: 'GET',
    Url: `${ApiRoute.Server}${ApiRoute.Tasks}`,
    UrlLabel: `${ApiRoute.Tasks}[?sort=title[_desc]]`
  }, {
    Description: 'Returns the task with the specified ID if it exists',
    Method: 'GET',
    Url: `${ApiRoute.Server}${ApiRoute.Task}`,
    UrlLabel: ApiRoute.Task
  }, {
    Description: 'Adds a new task',
    Method: 'POST',
    Url: `${ApiRoute.Server}${ApiRoute.Tasks}`,
    UrlLabel: ApiRoute.Tasks
  }, {
    Description: 'Updates the task with the specified ID if it exists',
    Method: 'PUT',
    Url: `${ApiRoute.Server}${ApiRoute.Task}`,
    UrlLabel: ApiRoute.Task
  }, {
    Description: 'Deletes the task with the specified ID if it exists',
    Method: 'DELETE',
    Url: `${ApiRoute.Server}${ApiRoute.Task}`,
    UrlLabel: ApiRoute.Task
  }],
  Headers: {
    Description: 'Description',
    Example: 'Example Value',
    Field: 'Field',
    Method: 'Method',
    Required: 'Required',
    Rules: 'Rules',
    URL: 'URL'
  },
  Rules: [{
    Field: 'title',
    Required: 'Yes',
    Rules: 'DataType=String, MinLength=3, MaxLength=50',
    Example: 'A short title'
  }, {
    Field: 'description',
    Required: 'No',
    Rules: 'DataType=String, MaxLength=250',
    Example: 'An optional and longer description'
  }, {
    Field: 'date',
    Required: 'Yes',
    Rules: 'DataType=String, Format=YYYY-MM-DD',
    Example: '2021-01-31'
  }, {
    Field: 'status',
    Required: 'Yes',
    Rules: 'DataType=String',
    Example: '"N/A", "Not Started", "Started", "In Progress", "Almost Done", "Completed"'
  }]
};
