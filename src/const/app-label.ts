import { AppLabelAPI } from "./labels/app-label-api";
import { AppLabelApp } from "./labels/app-label-app";
import { AppLabelHome } from "./labels/app-label-home";
import { AppLabelTaskStatus } from "./labels/app-label-task-status";

export const AppLabel = {
  About: 'About',
  API: AppLabelAPI,
  App: AppLabelApp,
  BackToList: 'Back to List',
  Create: 'Create',
  CreateNew: 'Create New',
  CreateTask: 'Create Task',
  Date: 'Date',
  Delete: 'Delete',
  DeleteTask: 'Delete Task',
  DeleteTaskConfirm: 'Are you sure you want to delete this task?',
  Description: 'Description',
  Details: 'Details',
  DownloadJSON: 'Download JSON',
  Edit: 'Edit',
  EditTask: 'Edit Task',
  Home: AppLabelHome,
  Save: 'Save',
  Status: 'Status',
  Tasks: 'Tasks',
  TaskDetails: 'Task Details',
  TaskStatus: AppLabelTaskStatus,
  Title: 'Title'
};
