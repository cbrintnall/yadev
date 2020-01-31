import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
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
        Testing, testing.
      </Modal.Body>
      <Modal.Footer>
        <YouDevButton>Close</YouDevButton>
        <YouDevButton>Submit Offer</YouDevButton>
      </Modal.Footer>
    </Modal>
  )
}

export default OfferModal;