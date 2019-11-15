import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import Home from './components/Home';
import ContactPage from './components/ContactPage';
import MainNav from './components/MainNav';

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <MainNav
          loggedIn={false}
        />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contact/:user" component={ContactPage} />
          </Switch>
        </Router>
      </div>
    );
 }
}
