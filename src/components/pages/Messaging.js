import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';

import "./css/messaging.css";
import Rating from '../Rating';
import * as colors from '../../colors';
import GlobalNotificationManager from '../../gnm';
import MessageList, { MessageBox } from '../lists/messagelist';
import PostList from '../lists/PostList';
import OfferModal from '../modals/OfferModal';
import OfferPanelBottom from '../panels/OfferBottomPanel';
import { userToken, getTokenInfo } from '../../utils';
import { getConversation, getUser, sendMessage, getUsersPosts, getLatestOffer } from '../../calls';

class BrokerPage extends React.Component {
  constructor() {
    super();

    this.state = {
      messages: [],
      otherUser: {},
      otherUsersPosts: [],
      otherUserRating: 0, // TODO: Implement this,
      offering: false,
      offeredPost: {},
      offers: [],
      offerPointer: 0
    }
  }

  componentDidMount() {
    const currUser = getTokenInfo();

    const {
      to,
      from
    } = this.props.match.params;

    if (to === from) {
      this.props.history && this.props.history.push('/')
    }

    const otherUser = from === currUser._id ? to : from;

    getUser(otherUser)
      .then(res => {
        this.setState({ otherUser: res.data })
      })
      .catch(_ => {
        GlobalNotificationManager.push('alert', {
          msg: 'Failed to grab other user\'s data', ok: false
        })
      })

    getUsersPosts(currUser._id)
      .then(res => {
        this.setState({
          otherUsersPosts: res.data.results
        })
      })
      .catch(err => {
        GlobalNotificationManager.push('alert', {
          msg: "Failed to get other user's posts", ok: false
        })
      })

    getConversation(to, from, userToken())
      .then(res => {
        this.setState({
          messages: res.data.results
        })
      })
      .catch(err => {
        GlobalNotificationManager.push('alert', {
          msg: "Failed to get conversation", ok: false
        })
      })

    getLatestOffer(to, from)
      .then(res => {
        this.setState({
          offers: res.data.results
        })
      })
      .catch(console.error)
  }

  sendMessage(msg) {
    const {
      to,
      from
    } = this.props.match.params;

    sendMessage(from, to, msg, userToken())
      .then(res => {
        const messages = [res.data, ...this.state.messages]
        this.setState({ messages })
      })
      .catch(err => {
        GlobalNotificationManager.push('alert', {
          msg: "Failed to send message!", ok: false
        })
      })
  }

  render() {
    return (
      <Container fluid style={{ height: "100%" }}>
        {
          this.state.offering && 
          <OfferModal
            post={this.state.offeredPost}
            user={this.state.otherUser}
            onHide={() => { this.setState({offering: false}) }}
          />
        }
        {
          this.state.offers.length > 0 &&
          <OfferPanelBottom
            offer={this.state.offers[this.state.offerPointer]}
          />
        }
        <Row className="justify-content-md-center">
          <Col
            sm={3}
            style={{
              padding: "1rem",
              borderRadius: "2rem",
              textAlign: "center",
              margin: "24px 0px 24px 0px",
              backgroundColor: colors.yaDevPurple,
              boxShadow: ("10px -10px " + colors.yaDevGrey),
              border: "3px solid white"
            }}
          >
            <h3 style={{
              padding: "0rem 1rem .3rem 1rem",
              color: "white"
            }}
            >
              {this.state.otherUser.username}
            </h3>
            <Row>
              <Col>
                <Badge variant="info">
                  Completed: {this.state.otherUser.completed}
                </Badge>
              </Col>
              <Col>
                <Rating
                  ratings={this.state.otherUserRating}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col
            sm={7}
          >
            <PostList
              offer
              posts={this.state.otherUsersPosts}
              onOffer={(e) => { this.setState({ offering: true, offeredPost: e }) }}
            />
          </Col>
          <Col
            xs={12}
            sm={5}
          >
            <MessageBox
              style={{ marginBottom: "12px" }}
              onSubmit={this.sendMessage.bind(this)}
            />
            <Row
              style={{
                border: "3px solid black",
                borderRadius: "12px",
                margin: "24px",
                maxHeight: "50vh",
                overflow: "scroll",
                overflowX: "hidden",
                boxShadow: (`10px -10px ${colors.yaDevGrey}`)
              }}
            >
              <MessageList
                messages={this.state.messages}
              />
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default BrokerPage;