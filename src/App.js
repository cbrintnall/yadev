import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './components/Home';
import MainNav from './components/MainNav';
import BrokerPage from './components/pages/Messaging';
import Footer from './components/Footer';
import { loggedIn } from './utils';

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
            <Route exact path="/messages/:to/:from" component={BrokerPage} />
          </Switch>
        </Router>
        <Footer
        />
      </div>
    );
 }
}
