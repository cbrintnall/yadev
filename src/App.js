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
import Landing from './components/pages/Landing';
import About from './components/pages/About';
import AlertBar from './AlertBar';

const App = (props) => {
  return (
    <Router>
      <AlertBar />
      <section id="main_content">
        <MainNav
          loggedIn={loggedIn()}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/messages/:to/:from" component={BrokerPage} />
          <Route exact path="/profile/me" component={Profile} />
          <Route exact path="/landing" component={Landing} />
          <Route exact path="/about" component={About} />
        </Switch>
      </section>
      <Footer id="footer" />
    </Router>
  );
}

export default App;
