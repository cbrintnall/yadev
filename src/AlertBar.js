import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as colors from './colors';
import GlobalNotificationManager from './gnm';

class AlertBar extends React.Component {
  constructor() {
    super();

    this.state = {
      alert: {}
    }

    GlobalNotificationManager.subscribe('alert', this.onAlert.bind(this))

    this.onClick = this.onClick.bind(this);
  }

  onAlert(e) {
    this.setState({ alert: e })
  }

  onClick(e) {
    this.setState({ alert: {} })
  }

  render() {
    return (
      <Container
        className="alert-bar"
        fluid
        onClick={this.onClick}
        style={{
            position: "fixed",
            zIndex: "500",
            width: "90%",
            left: "50%",
            transform: "translate(-50%, 25%)"
        }}
      >
        {
          Object.keys(this.state.alert).length > 0 &&
          <Row
            noGutters
            style={{
              border: "3px solid black",
              borderRadius: "24px",
              backgroundColor: !this.state.alert.ok ? colors.rejectionRed : colors.acceptanceGreen
            }}
          >
            <Col
              className="d-flex justify-content-center align-items-center"
              style={{
                margin: "20px"
              }}
            >
              { this.state.alert.msg }
            </Col>
          </Row>
        }
      </Container>
    )
  }
}

export default AlertBar;