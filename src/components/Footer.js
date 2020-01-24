import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Settings from '../settings';
import BadgeButton from './buttons/BadgeButton'
import * as colors from '../colors';

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
        <li
            
        >
            {children}
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
                bottom:"0px",
                zIndex: 5000
            }}
            >
                <Col>
                    <Container>
                        <Row style={{marginTop: "1rem"}}>
                            <Col style={{textAlign: "center"}}>
                                <h4 style={{color: "white", textShadow: "2px 2px black"}}>About <span style={{fontSize: "12px"}}>v{Settings.VERSION}</span></h4>
                                <hr />
                                <FooterList>
                                    <FooterElement>
                                        <a style={{color: "black"}} target="_blank" href={Settings.source}>View Source</a>❤️
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