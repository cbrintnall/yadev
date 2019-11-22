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

    submitForm(val) {
        val.preventDefault();
        const form = this.postRef.current;

        const payload = {
            description: form.elements.description.value,
            tags: form.elements.tags.value,
            price: form.elements.price.value,
            type: form.elements.type.value
        }
        
        console.log(payload)
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
                    <Form ref={this.postRef} onSubmit={this.submitForm.bind(this)}>
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
                                    name="type"
                                    value="youtuber"
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Developer"
                                    name="type"
                                    value="developer"
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
                                    <Form.Control 
                                        type="text" 
                                        placeholder="50" 
                                        name="price"
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Row>
                        <hr/>
                        <Form.Row>
                            <Form.Label>
                                <h5>Description:</h5>
                            </Form.Label>
                            <Form.Control 
                                style={{marginBottom: "1rem"}} 
                                as="textarea" 
                                name="description"
                            />
                        </Form.Row>
                        <Form.Row>
                            <Form.Label>
                                <h5>
                                    Tags:
                                </h5>
                            </Form.Label>
                            <TagInput 
                                style={{marginBottom: "1rem"}} 
                                name="tags"
                            />
                        </Form.Row>
                        <Modal.Footer>
                        <YouDevButton
                            type="submit"
                            text="Submit"
                        />
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default PostModal;