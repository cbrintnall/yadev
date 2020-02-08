import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { getAcceptedOffers, getRejectedOffers } from '../../../calls';
import GlobalNotificationManager from '../../../gnm';

class HomeRightBar extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {
    return (
      <Col {...this.props} style={{ padding: 0 }}>
        <ListGroup style={{ borderLeft: "3px solid black", borderBottom: "3px solid black" }}>
          <ListGroup.Item>
            Outstanding Contracts:
          </ListGroup.Item>
        </ListGroup>
      </Col>
    )
  }
}

export default HomeRightBar;