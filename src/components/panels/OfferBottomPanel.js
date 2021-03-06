import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import * as color from '../../colors';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BadgeButton from '../buttons/BadgeButton';
import InputGroup from 'react-bootstrap/InputGroup';
import { counterOffer, acceptOffer, rejectOffer } from '../../calls';
import GlobalNotificationManager from '../../gnm';

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
  const [errors, setErrors] = useState("");

  const baseOffer = props.offer.offer;

  const onReject = () => {
    if (countering) {
      setErrors("");
      setCountering(false)
    } else {
      rejectOffer(props.offer._id)
        .then(_ => {
          GlobalNotificationManager.sendAlert(`Rejected offer for $${props.offer.offer}.`, false)
        })
        .catch(err => {
          GlobalNotificationManager.sendAlert(`We failed to reject the offer, something went wrong :(`, false)
        })
    }
  }

  const onAccept = () => {
    if (countering) {
      setErrors("")

      counterOffer(props.offer._id, value)
        .then(_ => {
          GlobalNotificationManager.sendAlert(`Countered the offer for $${value}.`)
        })
        .catch(err => {
          setErrors(err.response.data.error)
        })
    } else {
      acceptOffer(props.offer._id)
        .then(resp => {
          switch (resp.status) {
            case 201:
              GlobalNotificationManager.sendAlert('Contract accepted!', true);
              break;
            case 202:
              GlobalNotificationManager.sendAlert('Contract has already been accepted.', false);
              break;
          }
        })
        .catch(err => {
          switch(err.response.status) {
            case 400:
              GlobalNotificationManager.sendAlert('A contract already exists for this offer', false);
              break;
            default:
              GlobalNotificationManager.sendAlert(`Failed to accept the offer, something went wrong on our end :(`, false)
          }
        })
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
        backgroundColor: color.yaDevBlue,
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
              {
                errors &&
                <div style={{color: color.rejectionRed, marginTop: ".5rem"}}><strong>{errors}</strong></div>
              }
            </Form.Group>
          }
          {
            !countering &&
            <Button style={{backgroundColor: "darkgrey", color: "black" }} onClick={_ => { setCountering(true) }}>
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
