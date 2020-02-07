import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BadgeButton from '../../buttons/BadgeButton';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { getMainLatestOffers } from '../../../calls';
import { withRouter } from 'react-router';
import * as colors from '../../../colors';

const HomeLeftBar = (props) => {
  const [offers, setOffers] = useState([])

  const onMount = () => {
    getMainLatestOffers()
      .then(result => {
        setOffers(result.data)
      })
      .catch(console.error)
  }

  const getDate = (offer) => {
    const day = new Date(offer.createdAt);

    return ` ${day.getDate()}/${day.getMonth()+1}/${day.getFullYear()}`
  }

  useEffect(onMount)

  return (
    <Col
      {...props}

      style={{
        width: "100%",
        padding: 0,
        margin: "12px 0px 12px 0px"
      }}
    >
      {
        offers.length > 0 &&
        <ListGroup
          style={{
            borderRadius: "12px",
            border: "3px solid black",
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
                    <span style={{color: "darkgrey", marginRight: "6px"}}>Created: </span> <span>{ getDate(offer) } </span>
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
    </Col>
  )
}

export default withRouter(HomeLeftBar);