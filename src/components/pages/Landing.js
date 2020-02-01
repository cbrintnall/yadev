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

const CARD_EXPLANATION = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris augue ipsum, sodales vitae laoreet vitae, interdum vel risus. Nulla facilisi. Suspendisse posuere rhoncus placerat. Nunc ut ante eget odio auctor mattis ut sit amet augue. In tincidunt, sem at aliquam varius, risus sapien tempus dui, eu iaculis nisl lorem eu enim. Suspendisse venenatis nisi lacus. Aliquam tellus felis, pretium vitae bibendum sit amet, elementum ut enim. Pellentesque facilisis non dui eget porttitor. Nam a mattis sem, at congue ex. Ut lectus neque, laoreet eget lectus ut, venenatis tempus turpis.
`

const CONTENT_CREATOR_EXPLANATION = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris augue ipsum, sodales vitae laoreet vitae, interdum vel risus. Nulla facilisi. Suspendisse posuere rhoncus placerat. Nunc ut ante eget odio auctor mattis ut sit amet augue. In tincidunt, sem at aliquam varius, risus sapien tempus dui, eu iaculis nisl lorem eu enim. Suspendisse venenatis nisi lacus. Aliquam tellus felis, pretium vitae bibendum sit amet, elementum ut enim. Pellentesque facilisis non dui eget porttitor. Nam a mattis sem, at congue ex. Ut lectus neque, laoreet eget lectus ut, venenatis tempus turpis.
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
        textShadow: `2px -2px ${colors.yaDevPurple}`
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
        color: "white",
        fontSize: "18px",
        maxWidth: "60rem"
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
            Easily find advertisement for your games
          </LandingTitle>
          <LandingParagraph>
            {CARD_EXPLANATION}
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
      <hr />
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
          <LandingParagraph>
            {CONTENT_CREATOR_EXPLANATION}
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