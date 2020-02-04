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
import GlobalNotificationManager from '../../gnm';
import { submitOffer } from '../../calls';

const OfferModal = (props) => {
  const [show, setShow] = useState(true)
  const [amount, setAmount] = useState(props.post.price)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState("")

  const hide = () => {
    setShow(false);

    props.onHide && props.onHide()
  }

  const submit = () => {
    const payload = {
      to: props.user._id,
      post: props.post._id,
      offer: amount
    }

    setSubmitting(true);

    submitOffer(payload)
      .then(res => {
        if (res.status === 201) {
          setErrors("")
          setSubmitting(false)
          setShow(false)

          GlobalNotificationManager.sendAlert(`Successfully sent offer to ${props.user.username}!`, true)
        }
      })
      .catch(err => {
        setSubmitting(false)
        setErrors(err.response.data.error || 'Unknown error.')
      })
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
                    <br />
                    {
                      // If there are errors, display them.
                      errors &&
                      <Form.Control.Feedback style={{color: "red"}}>
                      { errors }
                      </Form.Control.Feedback>
                    }
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
        <YouDevButton onClick={submit}>{submitting ? "Please wait.." : "Submit Offer"}</YouDevButton>
      </Modal.Footer>
    </Modal>
  )
}

export default OfferModal;