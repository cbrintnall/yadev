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
  const [amount, setAmount] = useState(props.post.price)

  const hide = () => {
    setShow(false);
    props.onHide && props.onHide()
  }

  const submit = () => {
    const payload = {
      to: props.user._id,
      offer: amount,
      
    }
  }

  return (
    <Modal
      {...props}
      show={show}
      onHide={hide}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>Offer <span style={{ color: color.yaDevPurple }}>{props.user.username}</span></h3>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <Row>
            <Col className="d-flex justify-content-center">
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
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      placeholder={props.post.price}
                      type="text"
                      name="offer"
                      autoFocus={true}
                      onChange={(e) => {
                        const val = String(e.target.value).trim();

                        if (!isNaN(val) && !isNaN(parseFloat(val))) {
                          setAmount(parseInt(val));
                        }
                      }}
                      value={amount}
                      isValid={amount >= props.post.price}
                      isInvalid={amount < props.post.price}
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
        <YouDevButton onClick={submit}>Submit Offer</YouDevButton>
      </Modal.Footer>
    </Modal>
  )
}

export default OfferModal;