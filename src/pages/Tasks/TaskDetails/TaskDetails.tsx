import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppLabel } from 'src/const/app-label';
import { AppRoute } from 'src/const/app-route';
import { getTask, TasksState } from 'src/state/tasksReducer';

import './TaskDetails.scss';

function TaskDetails(props: any): JSX.Element {
  const task = props.item;

  return (
    <div>
      <h2>{ AppLabel.TaskDetails }</h2>

      <div className="App-jumbotron">
        <dl>
          <dt>{ AppLabel.Title }</dt><dd>{ task.title }</dd>
          <dt>{ AppLabel.Description }</dt><dd>{ task.description }</dd>
          <dt>{ AppLabel.Date }</dt><dd>{ task.date }</dd>
          <dt>{ AppLabel.Status }</dt><dd>{ task.status }</dd>
        </dl>

        { task._id &&
          <span><Link to={ AppRoute.Edit + '?id=' + task._id }>{ AppLabel.Edit }</Link>&nbsp;|&nbsp;</span>
        }

        <Link to={ AppRoute.Tasks }>{ AppLabel.BackToList }</Link>
      </div>
    </div>
  );
}

function mapStateToProps(state: TasksState) {
  return { item: getTask(state) };
};

export default connect(mapStateToProps)(TaskDetails);
