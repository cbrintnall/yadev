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
      {children}
    </li>
  )
}

const FooterLink = (props) => {
  return (
    <a style={{ color: "black" }} target="_blank" rel="noopener noreferrer" href={props.link}> { props.text } </a>
  )
}

class Footer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <footer>
        <Container
          fluid
          style={{ padding: "0px" }}
        >
          <Row
            style={{
              backgroundColor: colors.yaDevPurple,
              borderTop: "3px solid black",
              margin: "0px",
              paddingBottom: "64px",
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
                        <FooterLink text="About" link="/about" />
                      </FooterElement>
                      <FooterElement>
                        <FooterLink text="View source" link={Settings.source} />
                      </FooterElement>
                      <FooterElement>
                        <FooterLink text="Help us improve" link={Settings.improvementForm} />
                      </FooterElement>
                      <FooterElement>
                        <FooterLink text="Check out our progress" link={Settings.trelloBoard} />
                      </FooterElement>
                      <FooterElement>
                        <FooterLink text="Report a bug" link={`${Settings.githubIssues}/new`} />
                      </FooterElement>
                    </FooterList>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </footer>
    )
  }
}

export default Footer;