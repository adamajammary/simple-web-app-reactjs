import { Link } from 'react-router-dom';

import { AppLabel } from 'src/const/app-label';
import { AppRoute } from 'src/const/app-route';
import { sortTasks } from 'src/state/tasksReducer';
import store from 'src/state/store';

import './NavBar.scss';

function handleClick() {
  store.dispatch(sortTasks(AppLabel.API.Rules[0].Field));
}

function NavBar(): JSX.Element {
  return (
    <div className="NavBar">
      <div className="NavBar-content">
        <ul>
          <li><Link className="NavBar-brand" to={ AppRoute.Home }>{ AppLabel.App.Name }</Link></li>
          <li><Link to={ AppRoute.Tasks } onClick={ handleClick }>{ AppLabel.Tasks }</Link></li>
          <li><Link to={ AppRoute.API }>API</Link></li>
          <li><Link to={ AppRoute.About }>{ AppLabel.About }</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
