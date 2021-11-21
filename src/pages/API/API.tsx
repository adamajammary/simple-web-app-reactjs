import { AppLabel } from 'src/const/app-label';

import './API.scss';

function API(): JSX.Element {
  const actions: JSX.Element[] = [];

  AppLabel.API.Actions.forEach((action, index, array) => {
    actions.push(
      <tr key={ index }>
        <td>{ action.Method }</td>
        <td><a href={ action.Url } target="_blank" rel="noreferrer noopener">{ action.UrlLabel }</a></td>
        <td>{ action.Description }</td>
      </tr>
    );
  });

  const rules: JSX.Element[] = [];

  AppLabel.API.Rules.forEach((rule, index, array) => {
    rules.push(
      <tr key={ index }>
        <td>{ rule.Field }</td>
        <td>{ rule.Required }</td>
        <td>{ rule.Rules }</td>
        <td>{ rule.Example }</td>
      </tr>
    );
  });

  return (
    <div>
      <h2>{ AppLabel.API.Header }</h2>

      <div className="App-jumbotron">
        <h3>{ AppLabel.API.Title }</h3>

        <p>
          { AppLabel.API.Usage1 } <a href="https://www.getpostman.com/apps" target="_blank" rel="noreferrer noopener">Postman</a>&nbsp;
          { AppLabel.API.Usage2 } <a href="https://curl.haxx.se/docs/manpage.html" target="_blank" rel="noreferrer noopener">curl</a>&nbsp;
          { AppLabel.API.Usage3 }.
        </p>

        <table className="API-api">
          <thead>
            <tr>
              <th>{ AppLabel.API.Headers.Method }</th>
              <th>{ AppLabel.API.Headers.URL }</th>
              <th>{ AppLabel.API.Headers.Description }</th>
            </tr>
          </thead>

          <tbody>
            { actions }
          </tbody>
        </table>

        <table className="API-api">
          <thead>
            <tr>
              <th>{ AppLabel.API.Headers.Field }</th>
              <th>{ AppLabel.API.Headers.Required }</th>
              <th>{ AppLabel.API.Headers.Rules }</th>
              <th>{ AppLabel.API.Headers.Example }</th>
            </tr>
          </thead>

          <tbody>
            { rules }
          </tbody>
        </table>
      </div>      
    </div>
  );
}

export default API;
