import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import YouDevButton from '../YouDevButton';
import Post from '../cards/Post';
import * as color from '../../colors';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const OfferModal = (props) => {
  const [show, setShow] = useState(true)

  const hide = () => {
    setShow(false);
    props.onHide && props.onHide()
  }

  return (
    <Modal
      {...props}
      show={show}
      onHide={hide}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>Make an offer to <span style={{ color: color.yaDevPurple }}>{props.user.username}</span></h3>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Post
                noHide
                noRemove
                post={props.post}
              />
            </Col>
          </Row>
          <Row noGutters>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label><h5>Offer:</h5></Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      placeholder={props.post.price}
                      type="text"
                      name="offer"
                    />
                  </InputGroup>
                  <Form.Text style={{ color: "darkgrey" }}><strong>NOTE</strong>: Must be at least ${props.post && props.post.price} </Form.Text>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <YouDevButton onClick={hide}>Close</YouDevButton>
        <YouDevButton>Submit Offer</YouDevButton>
      </Modal.Footer>
    </Modal>
  )
}

export default OfferModal;