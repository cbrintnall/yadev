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
import { userToken, getTokenInfo } from '../../utils';
import { getConversation, getUser, sendMessage, getUsersPosts } from '../../calls';

class BrokerPage extends React.Component {
    constructor() {
        super();

        this.state = {
            messages: [],
            selectedMessage: {},
            selectedMessageUser: {},
            selectUserRating: 0,
            otherUsersPosts: []
        }

        this.setSelectedMessage = this.setSelectedMessage.bind(this);
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

        getUsersPosts(otherUser)
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

            if (this.state.messages.length > 0) {
                this.setSelectedMessage(this.state.messages[0])
            }
        })
        .catch(err => {
            GlobalNotificationManager.push('alert', { 
                msg: "Failed to get conversation", ok: false 
            })
        })
    }

    setSelectedMessage(msg) {
        const currUser = getTokenInfo();
        const {
            receiver,
            sender
        } = msg;

        // NOTE: Determines who isn't the current user in this conversation.
        const otherUser = sender === currUser._id ? receiver : sender;



        getUser(otherUser)
        .then(res => {
            this.setState({
                selectedMessageUser: res.data
            })
        })
        .catch(err => {
            GlobalNotificationManager.push('alert', { 
                msg: "Failed to grab user data.", ok: false 
            })
        })

        this.setState({
            selectedMessage: msg
        })
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
            <Container fluid style={{height: "100%"}}>
                <Row
                    className="justify-content-md-center"
                >
                    <Col
                        sm={2}
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
                            { this.state.selectedMessageUser.username }
                        </h3>
                        <Row>
                            <Col>
                                <Badge variant="info">
                                    Completed: { this.state.selectedMessageUser.completed } 
                                </Badge>
                            </Col>
                            <Col>
                                <Rating
                                    ratings={this.state.selectUserRating}
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
                            display
                            posts={this.state.otherUsersPosts}
                        />
                    </Col>
                    <Col 
                        xs={12}
                        sm={5}
                    >
                        <MessageBox
                            style={{marginBottom: "12px"}}
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
                                selectedMessage={this.setSelectedMessage}
                            />
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default BrokerPage;