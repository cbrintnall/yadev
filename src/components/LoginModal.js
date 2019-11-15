import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaGithub, FaFacebookSquare, FaTwitter } from 'react-icons/fa';

export default class LoginModal extends React.Component {
    constructor() {
        super()
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
                                    <ListGroup.Item action>
                                        <h4> Github <FaGithub /> </h4>
                                    </ListGroup.Item>
                                    <ListGroup.Item action>
                                        <h4> Facebook <FaFacebookSquare /> </h4>
                                    </ListGroup.Item>
                                    <ListGroup.Item action>
                                        <h4> Twitter <FaTwitter /> </h4>
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