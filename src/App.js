import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Profile from './components/pages/Profile';
import Home from './components/pages/Home';
import MainNav from './components/MainNav';
import BrokerPage from './components/pages/Messaging';
import Footer from './components/Footer';
import { loggedIn } from './utils';
import Settings from './settings';

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={{
        height: "100vh",
      }}>
        <Router>
            <MainNav
              loggedIn={loggedIn()}
            />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/messages/:to/:from" component={BrokerPage} />
            <Route exact path="/profile/me" component={Profile} />
            <Route exact path="/settings" component={_ => {
              return <div> {JSON.stringify(Settings)} </div>
            }} />
          </Switch>
        </Router>
        <Footer
          style={{bottom: "0px", height: "100%"}}
        />
      </div>
    );
 }
}
