import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './components/Home';
import ContactPage from './components/ContactPage';
import MainNav from './components/MainNav';
import BrokerPage from './components/pages/Messaging';
import { getToken, loggedIn } from './utils';

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Router>
          <MainNav
            loggedIn={loggedIn()}
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contact/:user" component={ContactPage} />
            <Route exact path="/messages/:to/:from" component={BrokerPage} />
          </Switch>
        </Router>
      </div>
    );
 }
}
