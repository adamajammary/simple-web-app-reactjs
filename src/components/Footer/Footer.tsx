import { AppLabel } from 'src/const/app-label';

import './Footer.scss';

function Footer(): JSX.Element {
  return (
    <div>
      <hr />
      <p>&copy; { AppLabel.App.Copyright } &bull; { AppLabel.App.Name }</p>
    </div>
  );
}

export default Footer;
