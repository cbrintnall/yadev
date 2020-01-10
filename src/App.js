import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './components/pages/Home';
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
      <div style={{
        height: "100%"
      }}>
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
          style={{bottom: "0px", height: "100%"}}
        />
      </div>
    );
 }
}
