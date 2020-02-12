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

const App = (props) => {
  return (
    <div>
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
      </Router>
      <Footer
        style={{
          height: "100%",
          padding: "0px 128px 128px 128px"
        }}
      />
    </div>
  );
}

export default App;
