import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import Home from './components/Home';
import ContactPage from './components/ContactPage';
import LoginModal from './components/LoginModal';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import YouDevButton from './components/YouDevButton';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      showLoginModal: false
    }
  }

  getAccountButton() {
    if (this.state.loggedIn) {
        return (
            <YouDevButton
                onClick={() => console.log("Logging out.")}
                text="Logout"
            />
        )
    } else {
        return (
            <YouDevButton
                onClick={() => this.setState({showLoginModal: !this.state.showLoginModal})}
                text="Login"
            />
        )
    }
  }

  render() {
    return (
      <div>
        <Navbar expand="lg" style={{backgroundImage: "linear-gradient(#A1D9FF, #CEA1FF)", borderBottom: "3px solid black"}}>
          <Navbar.Brand href=""><h2>You | Dev</h2></Navbar.Brand>
          <LoginModal
              show={this.state.showLoginModal}
              onHide={() => this.setState({showLoginModal: false})}
          />
          <Form inline>
              {this.getAccountButton()}
          </Form>
        </Navbar>
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
