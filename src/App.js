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
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const App = (props) => {
  return (
    <Router>
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
      <Footer />
    </Router>
  );
}

export default App;
