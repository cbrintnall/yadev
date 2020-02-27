import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';
import YouDevButton from '../buttons/YouDevButton';
import Spinner from 'react-bootstrap/Spinner';
import GlobalNotificationManager from '../../gnm';
import { getTokenInfo } from '../../utils';
import { sendPost } from '../../calls';
import { FaYoutube } from 'react-icons/fa';
import { MdComputer } from 'react-icons/md';
import * as colors from '../../colors';
import { omit } from 'lodash';

const MAX_DESCRIPTION_LENGTH = 120;
const MIN_DESCRIPTION_LENGTH = 30;

const SelectableIcon = (props) => {
  const [value, setValue] = useState(false);
  const [hovering, setHovering] = useState(false);

  return (
    <div
      style={{ 
        display: "inline", 
        margin: "4px",
        fontSize: "28px", 
        cursor: hovering ? "pointer" : "default", 
      }}
      onMouseEnter={() => { setHovering(true) }}
      onMouseLeave={() => { setHovering(false) }}
    >
      <props.icon
        onClick={_ => setValue(!value)}
        style={{
          color: value ? "white" : "black",
          borderBottom: hovering ? "3px solid white" : "none",
          marginBottom: "8px",
        }}
      />
      <Form.Check
        checked={value}
        {...omit(props, 'icon')}
        style={{ display: "none" }}
        readOnly
      />
    </div>
  )
}

const CreatePost = (props) => {
  const [priceValid, setPriceValid] = useState(false)
  const [descriptionLength, setDescriptionLength] = useState(0)
  const [descriptionValid, setDescriptionValid] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const postRef = React.createRef();

  const submit = () => {
    const info = getTokenInfo()
    const form = postRef.current;

    const payload = {
      owner: info._id,
      description: form.elements.description.value,
      price: form.elements.price.value,
      type: form.elements.type.value,
      hireable: form.elements.hired.value
    }

    console.log(payload)
    return;

    setSubmitting(true)

    sendPost(payload)
      .then(res => {

        GlobalNotificationManager.sendAlert('Submitted post successfully!', true)
        GlobalNotificationManager.push('newPost', res.data)
        props.onPost && props.onPost(payload);

        // Set state back to defaults
        setSubmitting(false)
        setDescriptionValid(false)
        setDescriptionLength(0)
        setPriceValid(false)

        // Reset form to blank values
        form.reset();
      })
      .catch(err => {
        console.log(err.response)

        setSubmitting(false)
        GlobalNotificationManager.sendAlert('Server had an error while creating the post', false);
        props.onPostError && props.onPostError(payload)
      });
  }

  return (
    <Container
      style={{
        backgroundColor: colors.yaDevGrey,
        borderRadius: "14px"
      }}
    >
      <Row
        style={{
          backgroundColor: colors.yaDevPurple,
          borderRadius: "14px 14px 0px 0px",
          padding: ".3rem",
          borderBottom: "3px solid black"
        }}
      >
        <Col className="d-flex justify-content-start align-items-center">
          <h4 style={{ color: "white" }}> New Post: </h4>
        </Col>
        <Col className="d-flex justify-content-end">
          <YouDevButton
            onClick={submit}
            type="submit"
            style={{ backgroundColor: "white", color: "black" }}
          >
            {
              submitting &&
              <Spinner
                as="span"
                size="sm"
              />
            }
            {submitting ? "Submitting..." : "Submit"}
          </YouDevButton>
        </Col>
      </Row>
      <Row style={{ padding: "1rem" }}>
        <Form ref={postRef} style={{ width: "100%" }}>
          <Row>
            <Col
              sm={6}
              md={6}
            >
              <Form.Row className="d-flex justify-content-start align-items-center">
                <div>
                  <h5>Type:</h5>
                </div>
                <div>
                  <SelectableIcon
                    icon={FaYoutube}
                    required
                    type="radio"
                    label="Youtuber"
                    name="type"
                    value="youtuber"
                  />
                  <SelectableIcon
                    icon={MdComputer}
                    required
                    type="radio"
                    label="Developer"
                    name="type"
                    value="developer"
                  />
                </div>
              </Form.Row>
              <Form.Row>
                <Form.Label>
                  <h5>Looking:</h5>
                </Form.Label>
                <Form.Check
                  inline
                  required
                  type="radio"
                  label="Hiring"
                  name="hired"
                  value={true}
                />
                <Form.Check
                  inline
                  required
                  type="radio"
                  label="For Hire"
                  name="hired"
                  value={false}
                />
              </Form.Row>
              <Form.Row>
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
                    isValid={priceValid}
                    isInvalid={!priceValid}
                    onChange={e => { setPriceValid(/^\d{1,5}$/.test(e.target.value)) }}
                  />
                </InputGroup>
              </Form.Row>
            </Col>
            <Col
              style={{borderLeft: "1px solid white"}}
              sm={6}
              md={6}
            >
              <Form.Row>
                <Form.Label>
                  <h5>Description:</h5>
                </Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  name="description"
                  isValid={descriptionValid}
                  isInvalid={!descriptionValid}
                  onChange={e => {
                    const description = e.target.value;

                    setDescriptionLength(description.length)
                    setDescriptionValid(description.length >= MIN_DESCRIPTION_LENGTH && description.length <= MAX_DESCRIPTION_LENGTH)
                  }}
                />
                <Badge> {descriptionLength} / {MAX_DESCRIPTION_LENGTH} </Badge>
              </Form.Row>
            </Col>
          </Row>
        </Form>
      </Row>
    </Container>
  )
}

export default CreatePost