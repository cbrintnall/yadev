import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BadgeButton from '../../buttons/BadgeButton';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { getMainLatestOffers, getAcceptedOffers, getRejectedOffers } from '../../../calls';
import { withRouter } from 'react-router';
import GlobalNotificationManager from '../../../gnm';
import * as colors from '../../../colors';
import Accordion from 'react-bootstrap/Accordion';
import AccordionToggle, { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

const HomeLeftBar = (props) => {
  const [offers, setOffers] = useState([])

  const onMount = () => {
    getMainLatestOffers()
      .then(result => {
        setOffers([...result.data, ...result.data, ...result.data])
      })
      .catch(console.error)
  }

  const getDate = (offer) => {
    const day = new Date(offer.createdAt);

    return ` ${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`
  }

  useEffect(onMount)

  return (
    <Col
      {...props}

      style={{
        width: "100%",
        height: "100%",
        padding: 0
      }}
    >
      <Row>
        {
          offers.length > 0 &&
          <ListGroup
            style={{
              borderRight: "3px solid black",
              borderBottom: "3px solid black",
              width: "100%",
              margin: "0px"
            }}
          >
            <ListGroup.Item style={{ borderRadius: "12px" }}>
              Latest Offers:
          </ListGroup.Item>
            {
              offers.length > 0 &&
              offers.map((offer, i) => {

                return (
                  <ListGroup.Item key={i}>
                    <Row className="justify-content-center">
                      <span style={{ color: "darkgrey", marginRight: "6px" }}>Created: </span> <span>{getDate(offer)} </span>
                    </Row>
                    <hr />
                    <Row>
                      <Col style={{ textAlign: "center", margin: "4px 0px 4px 0px" }}>
                        <span> ${offer.offer} </span> |
                      {
                          offer.finalized ?
                            <Badge>
                              Idiot
                        </Badge> :
                            <BadgeButton
                              style={{ backgroundColor: colors.yaDevBlue }}
                              onClick={() => {
                                props.history.push(`/messages/${offer.to}/${offer.from}`)
                              }}
                            >
                              Go to
                      </BadgeButton>
                        }
                      </Col>
                    </Row>
                  </ListGroup.Item>
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
            <ListGroup.Item>Accepted & Rejected Offers:</ListGroup.Item>
            {
              this.state.offers
                .filter(offer => offer.accepted)
                .map(offer => {
                  return (
                    <Accordion>
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            <Badge variant="success"> Accepted </Badge>
                          </Col>
                          <Col>
                            <h4> ${offer.offer} </h4>
                          </Col>
                          <Col>
                            <Accordion.Toggle as={BadgeButton} eventKey="0">
                              Finalize
                          </Accordion.Toggle>
                            {/* <BadgeButton 
                            style={{backgroundColor: colors.acceptanceGreen}}
                            onClick={}
                          >
                            <h4> Finalize </h4>
                          </BadgeButton> */}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Accordion.Collapse eventKey="0">
                              <span> Testing </span>
                            </Accordion.Collapse>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </Accordion>
                  )
                })
            }
          </ListGroup>
        }
      </Col>
    )
  }
}

export default withRouter(HomeLeftBar);