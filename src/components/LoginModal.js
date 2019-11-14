import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Settings from '../settings';
import { FaGithub, FaGoogle } from 'react-icons/fa';

export default class LoginModal extends React.Component {
    constructor() {
        super()
    }

    facebookCallback(info) {
    }

    handleGithubLogin() {
        window.location = `https://github.com/login/oauth/authorize?client_id=${Settings.githubAccountId}&redirect_uri=${Settings.backendUrl}/auth/github?next=${Settings.hostBase}/`
    }

    handleGoogleLogin() {
        window.location = `${Settings.backendUrl}/auth/google?next=${Settings.hostBase}`;
    }

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Body
                    style={{borderRadius: "3px solid black"}}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col
                                style={{textAlign: "center"}}
                            >
                                <span>
                                    Please login with your preferred provider.
                                </span>
                            </Col>
                            <Col>
                                <ListGroup style={{textAlign: "center"}}>
                                    <ListGroup.Item 
                                        action
                                        onClick={this.handleGithubLogin}
                                    >
                                        <h4> Github <FaGithub /> </h4>
                                    </ListGroup.Item>
                                    <ListGroup.Item 
                                        action
                                        onClick={this.handleGoogleLogin}
                                    >
                                        <h4> Google <FaGoogle /> </h4>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal.Body>
            </Modal>
        )
    }
}