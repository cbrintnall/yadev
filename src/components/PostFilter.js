import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class PostFilter extends React.Component {
  constructor() {
    super();

    this.state = {
      type: []
    }
  }

  handleTypeChange(e) {
    const name = e.target.name;

    if (e.target.checked) {
      this.setState({
        type: [...this.state.type, name]
      })
    } else {
      const newType = this.state.type.filter(val => val !== name);

      console.log(newType)

      this.setState({
        type: newType
      })
    }
  }

  render() {
    return (
      <Form>
        <Row>
          <Form.Group>
            <Form.Label>I'm looking for a {this.state.type.join(", ")}.. </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="checkbox"
                label="Youtuber"
                name="Youtuber"
                id="formHorizontalRadios1"
                onChange={this.handleTypeChange.bind(this)}
              />
              <Form.Check
                type="checkbox"
                label="Developer"
                name="Developer"
                id="formHorizontalRadios2"
                onChange={this.handleTypeChange.bind(this)}
              />
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Label>With a price between</Form.Label>
            <Form.Control

            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Thats contains the tags..</Form.Label>
          </Form.Group>
        </Row>
      </Form>
    )
  }
}

export default PostFilter;