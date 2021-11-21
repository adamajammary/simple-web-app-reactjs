import { AppLabel } from 'src/const/app-label';

import './Home.scss';

function Home(): JSX.Element {
  return (
    <div>
      <h2>{ AppLabel.App.Name }</h2>

      <div className="App-jumbotron">
        <h3>{ AppLabel.Home.Title }</h3>
        <p>{ AppLabel.Home.Description }</p>
      </div>
    </div>
  );
}

export default Home;
