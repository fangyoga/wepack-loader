import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PageOne from './routes/page-one';
import PageTwo from './routes/page-two';
import './normalize.css';

const App = () => (
  <Router>
    <Route path="/" component={PageOne} />
    <Route path="/pageTwo" component={PageTwo} />
  </Router>
);

const rootNode = document.getElementById('app');

render(<App />, rootNode);
