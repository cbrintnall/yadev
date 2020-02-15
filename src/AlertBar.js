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

  getBackgroundColor = () => {
    return this.state.alert.negative ? colors.rejectionRed : colors.acceptanceGreen
  }

  render() {
    return (
      <Container
        className="alert-bar"
        fluid
        onClick={this.onClick}
      >
        {
          Object.keys(this.state.alert).length > 0 &&
          <Row
            noGutters
            style={{
              border: "3px solid black",
              borderRadius: "24px",
              backgroundColor: this.getBackgroundColor()
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