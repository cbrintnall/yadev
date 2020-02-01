import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import YouDevButton from '../YouDevButton';
import * as color from '../../colors';

const OfferModal = (props) => {
  return (
    <Modal
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>Make an offer to <span style={{color: color.yaDevPurple}}>{props.user.username}</span></h3>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label><h5>Offer:</h5></Form.Label>
            <Form.Control placeholder="50"/>
            <Form.Text>Must be above {  } </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <YouDevButton>Close</YouDevButton>
        <YouDevButton>Submit Offer</YouDevButton>
      </Modal.Footer>
    </Modal>
  )
}

export default OfferModal;