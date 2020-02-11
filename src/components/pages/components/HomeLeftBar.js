import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BadgeButton from '../../buttons/BadgeButton';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { withRouter } from 'react-router';
import GlobalNotificationManager from '../../../gnm';
import * as colors from '../../../colors';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaArrowRight } from 'react-icons/fa';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { humanized_time_span } from '../../../extra/humanized_time';
import { 
  getMainLatestOffers,
  getAcceptedOffers,
  getRejectedOffers,
  createNewContract
} from '../../../calls';

const FinalizeAccordionToggle = ({ _, eventKey }) => {
  const [open, setOpen] = useState(false);
  const onClick = useAccordionToggle(eventKey, () => setOpen(!open));

  return (
    <BadgeButton style={{ backgroundColor: colors.acceptanceGreen }} onClick={onClick}>
      <h4> Finalize </h4>
    </BadgeButton>
  )
}


class HomeLeftBar extends React.Component {
  constructor() {
    super();

    this.state = {
      offers: []
    }
  }

  componentDidMount() {
    getMainLatestOffers()
      .then(result => {
        this.setState({
          offers: result.data
        })
      })
      .catch(console.error)
  }

  getDate(offer) {
    const day = new Date(offer.createdAt);

    return ` ${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`
  }

  render() {
    return (
      <Col
        {...this.props}

        style={{
          width: "100%",
          height: "100%",
          padding: 0
        }}
      >
        <Row>
          {
            this.state.offers.length > 0 &&
            <ListGroup
              style={{
                borderRight: "3px solid black",
                borderBottom: "3px solid black",
                width: "100%",
                margin: "0px"
              }}
            >
              <ListGroup.Item style={{
                backgroundColor: colors.yaDevGrey,
                borderRadius: "0px"
              }}>
                Latest Offers:
            </ListGroup.Item>
              {
                this.state.offers.length > 0 &&
                this.state.offers.map((offer, i) => {
                  return (
                    <OverlayTrigger
                      key={i}
                      placement="right"
                      overlay={
                        <Tooltip>
                          Sent: {this.getDate(offer)}
                        </Tooltip>
                      }
                    >
                      <ListGroup.Item
                        key={i}
                        action
                        onClick={_ => {
                          this.props.history.push(`/messages/${offer.to}/${offer.from}`)
                        }}
                      >
                        <Row noGutters>
                          <Col className="d-flex justify-content-start">
                            ${offer.offer}
                          </Col>
                          <Col className="d-flex align-items-center justify-content-end">
                            <Badge style={{
                              color: colors.yaDevGrey,
                              borderRadius: "0px"
                            }}
                            >
                              {humanized_time_span(offer.createdAt)}
                            </Badge>
                          </Col>
                          <Col className="d-flex align-items-center justify-content-end">
                            <FaArrowRight />
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </OverlayTrigger>
                  )
                })
              }
            </ListGroup>
          }
        </Row>
        <Row>
          <AcceptedOffers />
        </Row>
      </Col>
    )
  }
}

class AcceptedOffers extends React.Component {
  constructor() {
    super();

    this.state = {
      offers: []
    }
  }

  componentDidMount() {
    Promise.all([getAcceptedOffers(), getRejectedOffers()])
      .then(res => {
        res.map(result => {
          this.setState({
            offers: [...this.state.offers, ...result.data]
          })
        })
      })
      .catch(err => {
        GlobalNotificationManager.sendAlert("Failed to retrieve accepted and rejected offers", false)
      })
  }

  onContractSend = (offer, date) => {
    createNewContract({
      estimateDate: date,
      from: offer.from,
      to: offer.to,
      offer: offer._id
    })
      .then(res => {
        const offers = 
          this.state.offers
            .filter(o => o !== offer)
    
        this.setState({ offers })
        GlobalNotificationManager.sendAlert("Sent contract!", true)
        GlobalNotificationManager.push('new_contract', res.data)
      })
      .catch(_ => {
        console.log(_)
        GlobalNotificationManager.sendAlert('Failed to create contract.', false)
      })
  }

  render() {
    return (
      <Col
        {...this.props}

        style={{
          padding: 0
        }}
      >
        {
          this.state.offers && this.state.offers.length > 0 &&
          <ListGroup style={{ borderRight: "3px solid black" }}>
            <ListGroup.Item
              style={{
                borderRadius: "0px",
                backgroundColor: colors.yaDevGrey
              }}
            >
              Accepted Offers:
            </ListGroup.Item>
            {
              this.state.offers
                .filter(offer => offer.accepted)
                .map(offer => {
                  return (
                    <OfferAccordionItem
                      offer={offer}
                      onSubmit={this.onContractSend}
                    />
                  )
                })
            }
          </ListGroup>
        }
      </Col>
    )
  }
}

const OfferAccordionItem = (props) => {
  const [hovering, setHovering] = useState(false)
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState("")
  const [isValid, setIsValid] = useState(false)

  const { offer } = props;

  const checkValid = (e) => {
    const val = e.target.value

    if (val) {
      setDate(val)
      const sDate = new Date(val)

      if (sDate.toString() === "Invalid Date" || sDate < new Date()) {
        setIsValid(false)
      } else {
        setIsValid(true)
      }
    }
  }

  const submitContract = () => {
    if (isValid) {
      props.onSubmit && props.onSubmit(offer, date)
    }
  }

  const onClickListItem = () => {
    if (open) {
      submitContract()
    } else {
      setOpen(true)
    }
  }

  return (
    <Accordion>
      <ListGroup.Item
        action
        eventKey="0"
        onMouseEnter={_ => setHovering(true)}
        onMouseLeave={_ => setHovering(false)}
        onClick={onClickListItem}
        style={{padding: open ? 0 : ".75rem 1.25rem"}}
      >
          {
            open ?
            <Row noGutters>
              <Col 
                className="d-flex justify-content-center"
                style={{
                  backgroundColor: colors.yaDevPurple, 
                  padding: ".75rem 1.25rem",
                  color: "white"
                }}
              >
                <span style={{textAlign: "center"}}> Submit </span>
              </Col>
            </Row> :
            <Row noGutters>
            <Col className="d-flex justify-content-start">
              ${offer.offer}
            </Col>
            <Col className="d-flex align-items-center justify-content-end">
              <Badge style={{
                color: colors.yaDevGrey,
                borderRadius: "0px"
              }}
              >
                { humanized_time_span(offer.createdAt) }
              </Badge>
            </Col>
            <Col className="d-flex align-items-center justify-content-end">
              <FaArrowRight style={{ transform: hovering || open ? "rotate(90deg)" : "initial" }}/>
            </Col>
            </Row>
          }
      </ListGroup.Item>
      <Accordion.Collapse eventKey="0">
        <Form>
          <Form.Control
            style={{paddingLeft: "1.25rem", borderRadius: 0}}
            required
            type="date"
            value={date}
            isValid={isValid}
            isInvalid={!isValid}
            onChange={checkValid}
          />
        </Form>
      </Accordion.Collapse>
    </Accordion>
  )

}

export default withRouter(HomeLeftBar);