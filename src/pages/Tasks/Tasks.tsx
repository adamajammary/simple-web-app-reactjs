import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ApiRoute } from 'src/const/api-route';
import { AppLabel } from 'src/const/app-label';
import { AppRoute } from 'src/const/app-route';
import { getTasks, sortTasks, TasksState } from 'src/state/tasksReducer';
import store from 'src/state/store';
import { Task } from 'src/models/Task';

import './Tasks.scss';

function getSort(sort: string): string {
  if (window.location.search === `?sort=${sort}`) {
    sort += '_desc';
  }

  return `?sort=${sort}`;
}

function handleClick(event: any) {
  let sort = event.target.href.substr(event.target.href.lastIndexOf('=') + 1);

  if (window.location.href === event.target.href) {
    sort += '_desc';
  }

  store.dispatch(sortTasks(sort));
}

function TaskHeader(): JSX.Element {
  const links: JSX.Element[] = [];

  AppLabel.API.Rules.forEach((rule, index, array) => {
    const label = `${rule.Field[0].toUpperCase()}${rule.Field.substring(1)}`;

    links.push(
      <th key={ index }>
        <Link to={ AppRoute.Tasks + getSort(rule.Field) } onClick={ handleClick }>{ label }</Link>
      </th>
    );
  });

  return (
    <tr>
      { links }
      <th></th>
    </tr>
  );
}

function TaskRow(props: any): JSX.Element {
  const task: Task = props.task;

  return (
    <tr>
      <td>{ task.title }</td>
      <td>{ task.description }</td>
      <td>{ task.date }</td>
      <td>{ task.status }</td>
      <td>
        <Link to={ AppRoute.Edit    + '?id=' + task._id }>{ AppLabel.Edit }</Link>&nbsp;|&nbsp;
        <Link to={ AppRoute.Details + '?id=' + task._id }>{ AppLabel.Details }</Link>&nbsp;|&nbsp;
        <Link to={ AppRoute.Delete  + '?id=' + task._id }>{ AppLabel.Delete }</Link>
      </td>
    </tr>
  );
}

function Tasks(): JSX.Element {
  const taskRows: JSX.Element[] = [];
  const tasks = getTasks(store.getState());

  for (const task of tasks) {
    taskRows.push(<TaskRow key={ task._id } task={ task } />);
  }

  const jsonUrl = `${ApiRoute.Server}${ApiRoute.Tasks}${window.location.search}`;

  return (
    <div>
      <h2>{ AppLabel.Tasks }</h2>

      <div className="App-jumbotron">
        <p><Link to={ AppRoute.Create }>{ AppLabel.CreateNew }</Link></p>

        <table>
          <thead>
            <TaskHeader />
          </thead>

          <tbody>
            { taskRows }
          </tbody>
        </table>

        <p><a href={ jsonUrl } target="_blank" rel="noreferrer noopener">{ AppLabel.DownloadJSON }</a></p>
      </div>
    </div>
  );
}

function mapStateToProps(state: TasksState) {
  return { tasks: [] };
};

export default connect(mapStateToProps)(Tasks);
