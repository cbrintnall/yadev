import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Settings from '../settings';
import * as colors from '../colors';

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
                height: "100%"
            }}
            >
            <Col>
                <Container>
                    <Row style={{marginTop: "1rem"}}>
                        <Col style={{textAlign: "center"}}>
                            <h4 style={{color: "white", textShadow: "2px 2px black"}}>Links</h4>
                            <hr />
                            <ul>
                                <li>Github</li>
                                <li>Twitter</li>
                            </ul>
                        </Col>
                        <Col style={{textAlign: "center"}}>
                            <h4 style={{color: "white", textShadow: "2px 2px black"}}>Social</h4>
                            <hr />
                        </Col>
                        <Col style={{textAlign: "center"}}>
                            <h4 style={{color: "white", textShadow: "2px 2px black"}}>About <span style={{fontSize: "12px"}}>v{Settings.VERSION}</span></h4>
                            <hr />
                        </Col>
                    </Row>
                </Container>
            </Col>
            </Row>
        )
    }
}

export default Footer;