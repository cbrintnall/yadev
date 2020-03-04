import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { withRouter } from 'react-router';
import * as colors from '../../../colors';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaArrowRight } from 'react-icons/fa';
import { humanized_time_span } from '../../../extra/humanized_time';
import { getMainLatestOffers} from '../../../calls';

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
      </Col>
    )
  }
}

export default withRouter(HomeLeftBar);