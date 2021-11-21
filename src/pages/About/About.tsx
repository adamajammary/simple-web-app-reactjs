import { AppLabel } from 'src/const/app-label';

import './About.scss';

function About(): JSX.Element {
  return (
    <div>
      <h2>{ AppLabel.About }</h2>

      <div className="App-jumbotron">
        <h3>{ AppLabel.App.Name }</h3>

        <p>
          { AppLabel.App.Version }<br />
          &copy; { AppLabel.App.Copyright }<br />
          <a href={ AppLabel.App.Url } target="_blank" rel="noreferrer noopener">{ AppLabel.App.Url }</a>
        </p>
      </div>
    </div>
  );
}

export default About;
