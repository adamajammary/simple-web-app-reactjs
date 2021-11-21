import { Link } from 'react-router-dom';

import { AppLabel } from 'src/const/app-label';
import { AppRoute } from 'src/const/app-route';

import TaskForm from '../TaskForm/TaskForm';

import './CreateTask.scss';

function CreateTask(): JSX.Element {
  return (
    <div>
      <h2>{ AppLabel.CreateTask }</h2>
      <hr />
      
      <div className="App-jumbotron">
        <TaskForm />

        <Link to={ AppRoute.Tasks }>{ AppLabel.BackToList }</Link>
      </div>
    </div>
  );
}

export default CreateTask;
