import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppLabel } from 'src/const/app-label';
import { AppRoute } from 'src/const/app-route';
import { getTask, TasksState } from 'src/state/tasksReducer';

import TaskForm from '../TaskForm/TaskForm';

import './EditTask.scss';

function EditTask(props: any): JSX.Element {
  const task = props.item;

  return (
    <div>
      <h2>{ AppLabel.EditTask }</h2>
      
      <div className="App-jumbotron">
        <TaskForm task={ task } />

        <Link to={ AppRoute.Tasks }>{ AppLabel.BackToList }</Link>
      </div>
    </div>
  );
}

function mapStateToProps(state: TasksState) {
  return { item: getTask(state) };
};

export default connect(mapStateToProps)(EditTask);
