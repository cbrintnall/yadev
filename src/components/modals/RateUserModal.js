import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '../Rating';
import { getMissingRatings } from '../../calls';

const RateUserModal = (props) => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    getMissingRatings()
      .then(res => {
        // 204 indicates no ratings to set.
        if (res.status === 200) {
          setRatings(res.data);
        }
      })
      .catch(err => {
        console.error(err)
      });
  }, [])

  const submit = r => {
    console.log(r)
  }

  return (
    <Modal show={true} onHide={_ => {}}>
      <Modal.Header>
        Please rate this user..
      </Modal.Header>
      <Modal.Body>
        {
          ratings.length > 0 &&
          ratings.map((r, i) => {
            return (
              <Row key={i}>
                <Col>
                  { r.to } 
                </Col>
                <Col className="d-flex justify-content-center">
                  <Rating editable onClick={submit} />
                </Col>
              </Row>
            )
          })
        }
      </Modal.Body>
    </Modal>
  )
}

export default RateUserModal;
