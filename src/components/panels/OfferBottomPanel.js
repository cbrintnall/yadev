import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import * as color from '../../colors';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BadgeButton from '../buttons/BadgeButton';
import InputGroup from 'react-bootstrap/InputGroup';
import { counterOffer } from '../../calls';

const INTERVALS = [
  -15,
  -10,
  -5,
  5,
  10,
  15
]

const OfferPanelBottom = (props) => {
  const [countering, setCountering] = useState(false)
  const [value, setValue] = useState(props.offer.offer)

  const baseOffer = props.offer.offer;

  const onCounter = () => {
    setCountering(true)
  }

  const onReject = () => {
    if (countering) {
      setCountering(false)
    } else {

    }
  }

  const onAccept = () => {
    if (countering) {
      counterOffer(props.offer._id, value)
        .then(res => {
          console.log(res)
        })
        .catch(console.error)
    } else {

    }
  }

  const getIntervals = () => {
    return INTERVALS
      .map(i => {
        return (
          <BadgeButton
            key={i}
            style={{margin: "6px 6px 8px 6px", backgroundColor: color.yaDevPurple, fontSize: "16px"}}
            onClick={() => {
              const percent = value * (i / 100)

              setValue(Math.round(value + percent))
            }}
          >
            { i }%
          </BadgeButton>
        )
      })
  }

  const getAccept = () => {
    return (
      <Button style={{ marginLeft: "12px", backgroundColor: color.acceptanceGreen, color: "black" }} onClick={onAccept}>
        { countering ? 'Submit Counter' : 'Accept' }
      </Button>
    )
  }

  const getReject = () => {
    return (
      <Button style={{ marginLeft: countering ? "0px" : "12px", backgroundColor: color.rejectionRed, color: "black" }} onClick={onReject}>
        { countering ? 'Cancel' : 'Reject' }
      </Button>
    )
  }

  return (
    <Row style={{ 
        borderTop: "3px solid black",
        padding: "16px",
        backgroundColor: "white",
        width: "100%",
        position: "fixed",
        bottom: "0",
        zIndex: "999"
      }}
    >
      <Col style={{ width: "100%" }}>
        <Form>
          {
            countering &&
            <Form.Group>
              <div>
                { getIntervals() }
                <BadgeButton
                  style={{margin: "6px 6px 8px 6px", backgroundColor: color.yaDevPurple, fontSize: "16px"}}
                  onClick={() => setValue(baseOffer)}
                >
                  Restore
                </BadgeButton>
              </div>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
          }
          {
            !countering &&
            <Button style={{backgroundColor: color.yaDevGrey, color: "black" }} onClick={onCounter}>
              Counter Offer
            </Button>
          }
          {
            countering ?
            <span>
              { getReject() }
              { getAccept() }
            </span>
            :
            <span>
              { getAccept() }
              { getReject() }
            </span>
          }
        </Form>
      </Col>
    </Row>
  )
}

export default OfferPanelBottom;