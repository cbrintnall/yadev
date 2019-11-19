import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import YouDevButton from './YouDevButton';
import TagInput from './TagInput';

class PostModal extends React.Component {
    constructor() {
        super();

        this.postRef = React.createRef();
    }

    submitForm(hlelo) {
        console.log(hlelo)
    }

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header>
                    <h2>Make a new post</h2>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={this.postRef}>
                        <Form.Row>
                            <Col>
                                <Form.Label>
                                    <h5>Type:</h5>
                                </Form.Label>
                                <br/>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Youtuber"
                                    name="postType"
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Developer"
                                    name="postType"
                                />
                            </Col>
                            <Col>
                                <Form.Label>
                                    <h5>Asking Price:</h5>
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" placeholder="50" />
                                </InputGroup>
                            </Col>
                        </Form.Row>
                        <hr/>
                        <Form.Row>
                            <Form.Label>
                                <h5>Description:</h5>
                            </Form.Label>
                            <Form.Control style={{marginBottom: "1rem"}} as="textarea" />
                        </Form.Row>
                        <Form.Row>
                            <Form.Label>
                                <h5>
                                    Tags:
                                </h5>
                            </Form.Label>
                            <TagInput style={{marginBottom: "1rem"}} />
                        </Form.Row>
                        <Modal.Footer>
                        <YouDevButton
                            type="submit"
                            text="Submit"
                            onClick={this.submitForm}
                        />
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default PostModal;