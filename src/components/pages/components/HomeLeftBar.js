import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BadgeButton from '../../buttons/BadgeButton';
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

  useEffect(onMount)

  return (
    <Col
      lg={2}
      md={2}
      sm={2}

      style={{
        width: "100%",
        padding: 0
      }}
    >
      <ListGroup
        style={{
          borderRadius: "12px",
          border: "3px solid black",
          width: "100%",
          margin: "0px"
        }}
      >
        <ListGroup.Item
          style={{ borderRadius: "12px" }}
        >
          Latest Offers:
        </ListGroup.Item>
        {
          offers.length > 0 &&
          offers.map(offer => {

            return (
              <ListGroup.Item>
                <Row>
                  <Col style={{textAlign: "center", margin: "4px 0px 4px 0px"}}>
                    <span> ${ offer.offer } </span> | 
                    <BadgeButton 
                      style={{backgroundColor: colors.yaDevBlue}}
                      onClick={() => {
                        props.history.push(`/messages/${offer.to}/${offer.from}`)
                      }}
                    >
                    Go to
                    </BadgeButton>
                  </Col>
                </Row>
              </ListGroup.Item>
            )
          })
        }
      </ListGroup>
    </Col>
  )
}

export default withRouter(HomeLeftBar);