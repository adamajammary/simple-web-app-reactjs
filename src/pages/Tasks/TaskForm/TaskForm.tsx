import React from 'react';

import { ApiRoute } from 'src/const/api-route';
import { AppConfig } from 'src/const/app-config';
import { AppLabel } from 'src/const/app-label';
import { AppRoute } from 'src/const/app-route';
import { createTask, editTask } from 'src/state/tasksReducer';
import store from 'src/state/store';
import { Task } from 'src/models/Task';

import './TaskForm.scss';

function TaskFormDate(props: any): JSX.Element {
  return (
    <div className="Tasks-form-group">
      <label htmlFor="taskDate">{ AppLabel.Date }</label>
      <br />
      <input type="date" id="taskDate" name="date" required value={ props.value } onChange={ props.onChange } />
    </div>
  );
}

function TaskFormDesc(props: any): JSX.Element {
  return (
    <div className="Tasks-form-group">
      <label htmlFor="taskDescription">{ AppLabel.Description }</label>
      <br />
      <input type="text" id="taskDescription" name="description" maxLength={ 250 } value={ props.value } onChange={ props.onChange } />
    </div>
  );
}

function TaskFormStatus(props: any): JSX.Element {
  return (
    <div className="Tasks-form-group">
      <label htmlFor="taskStatus">{ AppLabel.Status }</label>
      <br />
      <select id="taskStatus" name="status" value={ props.value } onChange={ props.onChange }>
        <option value={ AppLabel.TaskStatus.NA }>{ AppLabel.TaskStatus.NA }</option>
        <option value={ AppLabel.TaskStatus.NotStarted }>{ AppLabel.TaskStatus.NotStarted }</option>
        <option value={ AppLabel.TaskStatus.Started }>{ AppLabel.TaskStatus.Started }</option>
        <option value={ AppLabel.TaskStatus.InProgress }>{ AppLabel.TaskStatus.InProgress }</option>
        <option value={ AppLabel.TaskStatus.AlmostDone }>{ AppLabel.TaskStatus.AlmostDone }</option>
        <option value={ AppLabel.TaskStatus.Completed }>{ AppLabel.TaskStatus.Completed }</option>
      </select>
    </div>
  );
}

function TaskFormTitle(props: any): JSX.Element {
  return (
    <div className="Tasks-form-group">
      <label htmlFor="taskTitle">{ AppLabel.Title }</label>
      <br />
      <input type="text" id="taskTitle" name="title" required minLength={ 3 } maxLength={ 50 } value={ props.value } onChange={ props.onChange } />
    </div>
  );
}

class TaskForm extends React.Component<{ task?: Task }, Task> {
  constructor(props: any) {
    super(props);

    this.state = this.getDefaultState(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getDefaultState(props: any): Task {
    if (props.task) {
      return {
        title:       props.task.title,
        description: props.task.description,
        date:        props.task.date,
        status:      props.task.status
      };
    } else {
      return { title: '', description: '', date: '', status: AppLabel.TaskStatus.NA };
    }
  }

  handleChange(event: any) {
    if (event.target.required) {
      if (event.target.value && event.target.value.length >= event.target.minLength) {
        event.target.classList.remove('required');
      } else {
        event.target.classList.add('required');
      }
    }

    const state2: any = { [event.target.name]: event.target.value };
    this.setState(state2);
  }

  handleSubmit(event: any) {
    event.preventDefault();

    const id       = new URLSearchParams(window.location.search).get('id');
    const tasksUrl = `${ApiRoute.Server}${ApiRoute.Tasks}`;
    const url      = (this.props.task && id ? `${tasksUrl}/${id}` : tasksUrl);

    if (url) {
      fetch(url, {
        method:  (this.props.task ? 'PUT' : 'POST'),
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(this.state)
      }).then(() => {
        if (this.props.task) {
          store.dispatch(editTask(this.state));
        } else {
          store.dispatch(createTask(this.state));
        }

        window.location.replace(AppRoute.Tasks);
      }).catch(e => {
        if (!AppConfig.Env.IsProd) { console.error(e); }
      });
    }
  }

  render(): JSX.Element {
    const buttonLabel = (this.props.task ? AppLabel.Save : AppLabel.Create);

    return (
      <form name="task" onSubmit={ this.handleSubmit }>
        <TaskFormTitle value={ this.state.title } onChange={ this.handleChange } />
        <TaskFormDesc value={ this.state.description } onChange={ this.handleChange } />
        <TaskFormDate value={ this.state.date } onChange={ this.handleChange } />
        <TaskFormStatus value={ this.state.status } onChange={ this.handleChange } />

        <div className="Tasks-form-group">
          <button type="submit" id="taskSubmit" name="task_submit">{ buttonLabel }</button>
        </div>
      </form>
    );
  }
}

export default TaskForm;
