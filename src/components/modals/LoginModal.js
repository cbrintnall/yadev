import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import * as utils from '../../utils';

const LoginModal = (props) => {
  return (
    <Modal
      {...props}
      centered
    >
      <Modal.Body
        style={{ borderRadius: "3px solid black" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col
              style={{ textAlign: "center" }}
            >
              <span>
                Please login with your preferred provider.
              </span>
            </Col>
            <Col>
              <ListGroup style={{ textAlign: "center" }}>
                <ListGroup.Item
                  action
                  onClick={utils.loginGithub}
                >
                  <h4> Github <FaGithub /> </h4>
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  onClick={utils.loginGoogle}
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

export default LoginModal;