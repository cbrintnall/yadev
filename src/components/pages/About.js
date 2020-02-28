import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import * as colors from '../../colors';

const About = (props) => {
  return (
    <Row>
      <Col
        sm={2}
        md={2}
        lg={1}
      >
        <ListGroup>
          <ListGroup.Item style={{ backgroundColor: "darkgrey", padding: ".5rem", color: "white" }}>
            Posts:
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col
        sm={6}
        md={6}
        lg={6}
        style={{marginTop: "24px"}}>
        <h1> About YaDev </h1>
        <p> <strong> Who are we, and what do we want? </strong> </p>
        <hr />
        <p> 
          Well, nothing. This idea started when discussing starting a Minecraft server with a friend. They told me a previous project had hired
          a Youtuber to do some advertising. I thought <em> "Huh, what an interesting idea." </em> The rest is history. With game development as a hobby, and industry experience
          building micro services, and mediocre (<em style={{color: colors.yaDevPurple}}>yeah I know</em>) frontend skills, I set off to build YaDev. Although I commonly
          say <em>we</em> when I speak on behalf of YaDev, it's really just me currently. You can find the source down below which links to my Github. I'd love 
          to have more people contribute and really make this a great place to be for Youtubers and game developers. It seems like a common pairing, smaller Youtubers
          gain viewership by reviewing and advertising more niche games, while game developers can gain exposure from this. Both gain should they proceed with payments.
        </p>
        <p style={{color: colors.yaDevPurple}}>
          Speaking of payments, please check out the first post on the left.
        </p>
      </Col>
    </Row>
  )
}

export default About;