import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import YouDevButton from './YouDevButton';
import GlobalNotificationManager from '../gnm';
import { sendMessage } from '../calls';
import { userToken, getTokenInfo } from '../utils';

// Confirm times out in 5 seconds.
const CONFIRM_TIMEOUT_SECONDS = 5;
const MINIMUM_MESSAGE_LENGTH = 30;

export default class ContactModal extends React.Component {
    constructor() {
        super()

        this.state = {
            confirmed: false,
            submitting: false,
            submitted: false,
            submitTimer: undefined,
            errors: "",
            text: ""
        }

        this.textRef = React.createRef();
        this.onSubmitClick = this.onSubmitClick.bind(this);
    }

    doContactSubmit() {
        this.setState({
            submitting: true
        })

        if (this.state.submitTimer) {
            clearTimeout(this.state.submitTimer);
        }

        console.log(userToken())

        sendMessage(
            getTokenInfo()._id,
            this.props.contact.owner,
            this.textRef.current.value,
            userToken()
        ).then(res => {
                GlobalNotificationManager.push('alert',  {
                    msg: 'Successfully sent message.',
                    ok: true
                })
            })
            .catch(err => {
                GlobalNotificationManager.push('alert',  {
                    msg: 'Failed to sent message.',
                    ok: false
                })
            })
            .finally(() => {
                this.setState({ 
                    confirmed: false,
                    submitting: false,
                    submitted: false
                })

                this.props.onSubmit && this.props.onSubmit();
            })
    }

    onSubmitClick() {
        if (this.textRef.current) {
            const currentText = this.textRef.current.value;
            if (currentText.length < 1) {
                this.setState({errors: "No text entered."})
                return;
            }

            if (currentText.length < MINIMUM_MESSAGE_LENGTH) {
                this.setState({errors: `Message must be at least ${MINIMUM_MESSAGE_LENGTH} characters.`})
                return;
            }

            this.setState({errors: "", text: currentText});
        }

        if (this.state.confirmed) {
            this.doContactSubmit();
        } else {
            this.setState({
                confirmed: true,
                submitTimer: setTimeout(() => {
                    this.setState({confirmed: false})
                },
                CONFIRM_TIMEOUT_SECONDS * 1000)
            })
        }
    }

    getFooter() {
        if (this.state.submitting) {
            return (
                <Row>
                    <Col style={{paddingRight: ".05rem"}}>
                        <YouDevButton
                            disabled
                            text="Submitting..."
                        />
                    </Col>
                    <Col>
                        <Spinner animation="border" variant="dark" />
                    </Col>
                </Row>
            )
        }

        return (
            <YouDevButton
                text={this.state.confirmed ? "Confirm" : "Submit"}
                variant={this.state.confirmed ? "success" : ""}
                onClick={this.onSubmitClick}
            />
        )
    }

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        <h3>
                            Send a message...
                        </h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{borderRadius: "3px solid black"}}
                >
                    <InputGroup className="mb-3">
                        <FormControl 
                            as="textarea" 
                            ref={this.textRef} 
                            style={{borderRadius: "7px", border: "3px solid black"}}
                        />
                    </InputGroup>
                    <div style={{color:"LightSlateGrey", textAlign: "center"}}>
                        Remember to not share any passwords or credit card numbers.
                    </div>
                    <div style={{color: "red"}}>
                        {this.state.errors ? <hr /> : <span></span>}
                        {this.state.errors}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {this.getFooter()}
                </Modal.Footer>
            </Modal>
        )
    }
}
