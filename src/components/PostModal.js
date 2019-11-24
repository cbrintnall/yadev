import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import YouDevButton from './YouDevButton';
import TagInput from './TagInput';
import Badge from 'react-bootstrap/Badge';
import { sendPost } from '../calls';
import { getTokenInfo } from '../utils';
import Spinner from 'react-bootstrap/Spinner';

const MAX_TAGS_AMOUNT = 15;
const MAX_DESCRIPTION_LENGTH = 120;
const MIN_DESCRIPTION_LENGTH = 30;

class PostModal extends React.Component {
    constructor() {
        super();

        this.postRef = React.createRef();

        this.state = {
          descriptionValid: false,
          descriptionLength: 0,
          priceValid: false,
          tags: "",
          submitting: false,
          submitted: false
        }
    }

    submitForm(val) {
        val.preventDefault();
        // Extract user data from the token, so we can set the owner appropriately
        const info = getTokenInfo()
        const form = this.postRef.current;

        const payload = {
            owner: info._id,
            description: form.elements.description.value,
            tags: form.elements.tags.value.split(","),
            price: form.elements.price.value,
            type: form.elements.type.value
        }

        this.setState({
          submitting: true
        })

        sendPost(payload)
        .then(res => {
          if (this.props.onPost) {
            this.props.onPost(payload);
          }
        })
        .catch(err => {
          if (this.props.onPostError) {
            this.props.onPostError(payload);
          }
        });
    }

    onDescriptionChange(e) {
      const description = this.postRef.current.description.value;
      this.setState({
        descriptionLength: description.length,
        descriptionValid: description.length > MIN_DESCRIPTION_LENGTH && description.length < MAX_DESCRIPTION_LENGTH
      })
    }

    onPriceChange(e) {
      const price = this.postRef.current.price.value;
      this.setState({
        priceValid: /^\d{1,5}$/.test(price)
      })
    }

    onTagChange(e) {
      const tags = this.postRef.current.tags.value;

      if (tags.split(',').length > MAX_TAGS_AMOUNT) {
        this.setState({
          tagsInvalid: true
        })

        return;
      } else {
        this.setState({
          tagsInvalid: false
        })
      }

      this.setState({ tags });
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
                                    required
                                    type="radio"
                                    label="Youtuber"
                                    name="type"
                                    value="youtuber"
                                />
                                <Form.Check
                                    inline
                                    required
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
                                        required
                                        type="text" 
                                        placeholder="50" 
                                        name="price"
                                        isInvalid={!this.state.priceValid}
                                        onChange={this.onPriceChange.bind(this)}
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
                                required
                                as="textarea" 
                                name="description"
                                onChange={this.onDescriptionChange.bind(this)}
                                isInvalid={!this.state.descriptionValid}
                            />
                            <br />
                            <Badge> {this.state.descriptionLength} / {MAX_DESCRIPTION_LENGTH} </Badge>
                        </Form.Row>
                        <hr />
                        <Form.Row style={{marginTop: ".1rem"}}>
                            <Form.Label>
                                <h5>
                                    Tags:
                                </h5> 
                            {
                              this.postRef && this.postRef.current && this.postRef.current.tags.value ?
                                this.postRef.current.tags.value.split(',').map(val => {
                                  if (val && val.trim().length > 0 && val !== "") {
                                    return (
                                      <div style={{marginLeft: ".05rem", marginRight: ".05rem", display: "inline"}}>
                                        <Badge variant="dark"> { val } </Badge>
                                      </div>
                                    )
                                  }
                                }) :
                                <span> </span>
                            }
                            </Form.Label>
                            <TagInput 
                                style={{marginBottom: "1rem"}} 
                                name="tags"
                                onChange={this.onTagChange.bind(this)}
                                isInvalid={this.state.tagsInvalid}
                            />
                        </Form.Row>
                        <br />
                        <Modal.Footer>
                        <YouDevButton
                            type="submit"
                        >
                          { 
                            this.state.submitting ? 
                              <Spinner
                                as="span"
                                size="sm"
                              /> :
                              <span></span>
                          }
                              
                          { this.state.submitting ? "Submitting..." : "Submit" }
                        </YouDevButton>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default PostModal;
