import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import GlobalNotificationManager from '../../gnm';
import MessageList from '../lists/messagelist';

import { userToken } from '../../utils';
import { getConversation } from '../../calls';

class BrokerPage extends React.Component {
    constructor() {
        super();

        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        const {
            to,
            from
        } = this.props.match.params;

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
    }

    render() {
        return (
            <Container fluid style={{height: "100%"}}>
                <Row>
                    <Col sm={7} style={{backgroundColor: "blue"}}>
                        Hello
                    </Col>
                    <Col sm={5}>
                        <MessageList
                            messages={this.state.messages}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default BrokerPage;