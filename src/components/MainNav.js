import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import LoginModal from './LoginModal';
import Form from 'react-bootstrap/Form';
import YouDevButton from './YouDevButton';
import PostModal from './PostModal';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { logout } from '../utils';

class MainNav extends React.Component {
    constructor() {
        super();

        this.state = {
            showLoginModal: false,
            showPostModal: false,
            alerts: []
        }
    }

    componentDidMount() {
        this.setState({
            loggedIn: !!this.props.loggedIn,
            alerts: this.props.alerts ? this.props.alerts : []
        })
    }

    logout() {
        logout();
        this.setState({
            loggedIn: false
        })
    }

    getAccountButton() {
        if (this.state.loggedIn) {
            return (
                <YouDevButton
                    onClick={() => this.logout()}
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

    addAlert(text, success=true) {
      let alerts = this.state.alerts;
      alerts.push(
          <Alert
            onClick={this.onAlertClick.bind(this)}
            onMouseEnter={this.onHoverAlert.bind(this)}
            onMouseLeave={this.onLeaveHoverAlert.bind(this)}
            dismissable={true}
            style={{width: "100%", margin: "0px", textAlign: "center"}}
            variant={success ? "success" : "danger"}
          >
            { text } <strong> ( Click to remove ) </strong>
          </Alert>
      )

      this.setState({ alerts })
    }

    onPostSuccess(payload) {
      this.addAlert("Successfully added post!");

      this.setState({ showPostModal: false });
    }

    onPostError(payload) {
      this.addAlert("Failed to post!", false);

      this.setState({ showPostModal: false });
    }

    onAlertClick(e) {
      e.target.remove();
    }

    onHoverAlert(e) { }

    onLeaveHoverAlert(e) { }

    render() {
        return (
          <div>
            <Row>
              { this.state.alerts } 
            </Row>
            <Navbar expand="lg" style={{backgroundImage: "linear-gradient(#A1D9FF, #CEA1FF)", borderBottom: "3px solid black"}}>
                <Navbar.Brand href="">
                    <h2>YaDev</h2>
                </Navbar.Brand>
                <LoginModal
                    show={this.state.showLoginModal}
                    onHide={() => this.setState({showLoginModal: false})}
                />
                <PostModal
                    show={this.state.showPostModal}
                    onHide={() => this.setState({showPostModal: false})}
                    onPost={this.onPostSuccess.bind(this)}
                    onPostError={this.onPostError.bind(this)}
                />
                <Form inline>
                    {this.getAccountButton()}
                    {this.state.loggedIn ? <YouDevButton
                        style={{marginLeft: "1rem"}}
                        text="Make Post"
                        onClick={() => this.setState({showPostModal: true})}
                    /> : <span></span>}
                </Form>
            </Navbar>
          </div>
        )
    }
}

export default MainNav;
