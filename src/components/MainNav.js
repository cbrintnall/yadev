import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import LoginModal from './LoginModal';
import Form from 'react-bootstrap/Form';
import YouDevButton from './YouDevButton';
import PostModal from './PostModal';
import { logout } from '../utils';

class MainNav extends React.Component {
    constructor() {
        super();

        this.state = {
            showLoginModal: false,
            showPostModal: false
        }
    }

    componentDidMount() {
        this.setState({
            loggedIn: !!this.props.loggedIn
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

    render() {
        return (
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
        )
    }
}

export default MainNav;