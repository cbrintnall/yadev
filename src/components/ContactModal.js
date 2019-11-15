import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import YouDevButton from './YouDevButton';

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
            errors: ""
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
    }

    onSubmitClick() {
        if (this.textRef.current) {
            if (this.textRef.current.value.length < 1) {
                this.setState({errors: "No text entered."})
                return;
            }

            if (this.textRef.current.value.length < MINIMUM_MESSAGE_LENGTH) {
                this.setState({errors: `Message must be at least ${MINIMUM_MESSAGE_LENGTH} characters.`})
                return;
            }
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
                            Sending {this.props.contact.user ? this.props.contact.user.username : "Unknown user"} a message...
                        </h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{borderRadius: "3px solid black"}}
                >
                    <InputGroup className="mb-3">
                        <FormControl as="textarea" ref={this.textRef} />
                    </InputGroup>
                    <div style={{color: "red"}}>
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