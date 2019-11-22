import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './components/Home';
import ContactPage from './components/ContactPage';
import MainNav from './components/MainNav';
import AuthHandler from './components/Auth';
import { getToken, loggedIn } from './utils';

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <MainNav
          loggedIn={loggedIn()}
        />
        <Router>
          <Switch>
            <Route path="/auth" component={AuthHandler} />
            <Route exact path="/" component={Home} />
            <Route exact path="/contact/:user" component={ContactPage} />
          </Switch>
        </Router>
      </div>
    );
 }
}
