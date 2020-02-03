import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Settings from '../settings';
import * as colors from '../colors';
import { FaScroll, FaHeart } from 'react-icons/fa';

const FooterList = ({ props, children }) => {
  return (
    <ul
      style={{ listStyle: "none", margin: "0px", padding: "0px" }}
    >
      {children}
    </ul>
  )
}

const FooterElement = ({ props, children }) => {
  return (
    <li>
      <strong> {children} </strong>
    </li>
  )
}

class Footer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Row style={{
        backgroundColor: colors.yaDevPurple,
        borderTop: "3px solid black",
        margin: "0px",
        height: "100%",
        bottom: "0px",
        zIndex: 5000,
        ...this.props.style
      }}
      >
        <Col>
          <Container>
            <Row style={{ marginTop: "1rem" }}>
              <Col style={{ textAlign: "center" }}>
                <h4 style={{ color: "white", textShadow: "2px 2px black" }}>About <span style={{ fontSize: "12px" }}>v{Settings.VERSION}</span></h4>
                <hr />
                <FooterList>
                  <FooterElement>
                    <a style={{ color: "black" }} target="_blank" rel="noopener noreferrer" href={Settings.source}>View Source <FaHeart style={{color: "red"}} /></a>
                  </FooterElement>
                  <FooterElement>
                    <a style={{ color: "black" }} target="_blank" rel="noopener noreferrer" href={Settings.improvementForm}>Help us improve <FaScroll style={{color: "#FFE5A3"}} /></a>
                  </FooterElement>
                </FooterList>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    )
  }
}

export default Footer;