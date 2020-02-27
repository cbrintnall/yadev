import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Post from '../cards/Post';
import * as colors from '../../colors';
import * as utils from '../../utils';
import BadgeButton from '../buttons/BadgeButton';

const FAKE_DESCRIPTION = `
We're a relatively small
indie game company based out of Seattle, WA looking for a youtuber to review our game.
`

const LandingSignInButton = (props) => {
  return (
    <BadgeButton
      {...props}
      style={{
        backgroundColor: colors.myMessage,
        padding: "12px",
        color: "white",
        paddingRight: "24px",
        paddingLeft: "24px"
      }}
    >
      <h1
        style={{
          borderBottom: "2px solid white",
          paddingBottom: "4px",
          borderRadius: "2px"
        }}
      >
        {props.title}
      </h1>
    </BadgeButton>
  )
}

const LandingTitle = (props) => {
  return (
    <h1
      style={{
        color: "white",
        margin: "24px",
        textShadow: `2px -2px ${colors.yaDevPurple}`,
        ...props.style
      }}
    >
      {props.children}
    </h1>
  )
}

const LandingParagraph = (props) => {
  return (
    <p
      style={{
        maxWidth: "60rem",
        fontSize: "20px", 
        color: "white", 
        backgroundColor: "lightgray", 
        padding: "12px", 
        borderRadius: "18px",
        ...props.style
      }}
    >
      {props.children}
    </p>
  )
}

const Landing = (props) => {
  return (
    <Container
      style={{
        backgroundColor: colors.yaDevBlue,
        margin: "0px",
        maxWidth: "100%",
        padding: "48px"
      }}
    >
      <Row>
        <Col md={8}>
          <LandingTitle>
            Easily find advertisement for your games ...
          </LandingTitle>
          <hr/>
          <LandingParagraph>
            YaDev aims to provide an easy to use, seamless experience while browsing for potential partners. 
            We aim to create partnerships between independent game developers and youtubers. To achieve this,
            we use a simple job board approach. Users can make posts that convey only necessary information
            to begin collaboration.
            <br/>
            <br/>
            Users are able to give a small description of the project, if they're for hire <em>or</em> hiring, name
            their price (be it will pay or need to be paid), and finally their actual position. All this coupled with information
            that we give you to make a snap decision if working together will be worth it. We'll tell you how many jobs they've completed,
            and what their average rating is, given by other users.
          </LandingParagraph>
        </Col>
        <Col md={4}>
          <Post
            noHide
            post={{
              type: "developer",
              price: 50,
              description: FAKE_DESCRIPTION,
              user: {
                avgRating: 4,
                completed: 31
              }
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md={4} lg={4}>
          <Post
            style={{
              float: "right",
              marginRight: "20%"
            }}
            noHide
            post={{
              hireable: true,
              type: "youtuber",
              price: 0,
              description: "New content creator looking to review some games for free, please contact!",
              user: {
                avgRating: 5,
                completed: 2
              }
            }}
          />
        </Col>
        <Col md={8}>
          <LandingTitle>
            Not a developer?
          </LandingTitle>
          <hr />
          <LandingParagraph style={{textAlign: "right"}}>
            Thats okay, the partnership goes both ways. Set yourself up to stand out. Review games before they become more well known. Help out smaller developers.
            Alternatively, have a developer assist with creating you a website, or building you Twitch plugins. The possibilities are endless. Our posting platform
            supports both variations, be it developer or youtuber. Enjoy YaDev with the same ease a developer would.
          </LandingParagraph>
        </Col>
      </Row>
      <Row>
        <Col md={12} style={{ textAlign: "center" }}>
          <hr />
          <LandingTitle>
            Get started with Github or Google
          </LandingTitle>
          <hr />
          <LandingSignInButton
            title="Github"
            onClick={utils.loginGithub}
          />
          <LandingSignInButton
            title="Google"
            onClick={utils.loginGoogle}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Landing;