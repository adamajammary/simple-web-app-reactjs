import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ApiRoute } from 'src/const/api-route';
import { AppConfig } from 'src/const/app-config';
import { AppLabel } from 'src/const/app-label';
import { AppRoute } from 'src/const/app-route';
import { deleteTask, getTask, TasksState } from 'src/state/tasksReducer';
import { useAppDispatch } from 'src/state/hooks';

import './DeleteTask.scss';

function DeleteTask(props: any): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSubmit = (event: any) => {
    event.preventDefault();
  
    const id = new URLSearchParams(window.location.search).get('id');
  
    if (id) {
      fetch(`${ApiRoute.Server}${ApiRoute.Tasks}/${id}`, {
        method: 'DELETE'
      }).then(() => {
        dispatch(deleteTask(id));
  
        window.location.replace(AppRoute.Tasks);
      }).catch(e => {
        if (!AppConfig.Env.IsProd) { console.error(e); }
      });
    }
  };

  const task = props.item;

  return (
    <div>
      <h2>{ AppLabel.DeleteTask }</h2>

      <h3>{ AppLabel.DeleteTaskConfirm }</h3>

      <div className="App-jumbotron">
        <dl>
          <dt>{ AppLabel.Title }</dt><dd>{ task.title }</dd>
          <dt>{ AppLabel.Description }</dt><dd>{ task.description }</dd>
          <dt>{ AppLabel.Date }</dt><dd>{ task.date }</dd>
          <dt>{ AppLabel.Status }</dt><dd>{ task.status }</dd>
        </dl>

        { task._id &&
          <form name="task" onSubmit={ handleSubmit }>
            <div className="Tasks-form-group">
              <button type="submit" id="taskDelete" name="task_delete">{ AppLabel.Delete }</button>
            </div>
          </form>
        }

        <Link to={ AppRoute.Tasks }>{ AppLabel.BackToList }</Link>
      </div>
    </div>
  );
}

function mapStateToProps(state: TasksState) {
  return { item: getTask(state) };
};

export default connect(mapStateToProps)(DeleteTask);
