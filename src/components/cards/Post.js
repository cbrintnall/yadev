import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import YouDevButton from '../buttons/YouDevButton';
import Rating from '../Rating';
import BadgeButton from '../buttons/BadgeButton';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import * as colors from '../../colors';
import { getTokenInfo, loggedIn } from '../../utils';
import { humanized_time_span } from '../../extra/humanized_time';

const OK_START = 10;
const OK_END = 30;
const GOOD_END = 60;
const AMAZING_END = 100;

const OfferButton = (props) => {
  const [hover, setHover] = useState(false);

  return (
    <Row>
      <Col>
        <Button
          onMouseEnter={() => { setHover(true) }}
          onMouseLeave={() => { setHover(false) }}
          onClick={() => { props.onOffer && props.onOffer() }}
          style={{
            backgroundColor: hover ? "white" : colors.acceptanceGreen,
            color: hover ? colors.yaDevPurple : "black",
            fontSize: "22px",
            display: "block",
            width: "100%",
          }}
        >
          <span> Offer </span>
        </Button>
      </Col>
    </Row>
  )
}

class Post extends React.Component {
  constructor() {
    super();

    this.state = {
      display: false
    }

    this.getFilteredTags = this.getFilteredTags.bind(this);
  }

  getCompleteBadge() {
    if (!this.props.post.user || !this.props.post.user.completed) {
      return (<Badge>N/A</Badge>)
    }

    let variant = "danger";
    const { post: { user: { completed } } } = this.props;

    if (completed >= OK_START && completed < OK_END) {
      variant = "warning"
    }

    if (completed >= OK_END && completed < GOOD_END) {
      variant = "success"
    }

    if (completed >= GOOD_END && completed < AMAZING_END) {
      variant = "primary"
    }

    if (completed >= AMAZING_END) {
      variant = "info"
    }

    return (<Badge variant={variant}>{String(completed)}</Badge>)
  }

  getShadow() {
    const { post } = this.props;

    if (post.hasBeenAccepted && post.contacted) {
      return "#7AFF99";
    }

    if (!post.hasBeenAccepted && post.contacted) {
      return "#FFFB7A";
    }

    return "LightGray";
  }

  getDate(dateString) {
    if (!dateString) {
      return "";
    }

    return humanized_time_span(dateString);
  }

  getFilteredTags(tags) {
    return tags.filter(tag => {
      return !!tag
    })
  }

  render() {
    const { post } = this.props;
    const userIsOwner = getTokenInfo() && post.owner === getTokenInfo()._id;

    return (
      <Card style={{
        width: '18rem',
        borderRadius: '2rem',
        margin: "1rem",
        boxShadow: ("10px -10px " + this.getShadow()),
        border: "4px solid black",
        overflow: "hidden",
        ...this.props.style
      }}
      >
        <Card.Body>
          <Card.Title>
            <h2 style={{ borderBottom: "3px solid black", paddingBottom: "4px" }}>
              {post.type.charAt(0).toUpperCase() + post.type.substring(1)}
            </h2>
            <Badge
              variant={post.hireable ? "success" : "danger"}
              style={{ margin: "4px" }}
            >
              {post.hireable ? "For Hire" : "Looking"}
            </Badge>
            <br />
          </Card.Title>
          <Card.Subtitle>
            <h4>
              <Badge>${post.price}</Badge> 
              { 
                post.price === 0 && 
                <span 
                  style={{ 
                    fontSize: "20px" 
                  }}
                >
                  <Badge variant="success">
                    <u>Free</u>
                  </Badge>
                </span> 
              }
            </h4>
          </Card.Subtitle>
          <Card.Text style={{ backgroundColor: "#94B3FF", padding: ".5rem", borderRadius: ".5rem" }}>
            <span
              style={{ color: "white" }}
            >{post.description}</span>
          </Card.Text>
          {post.creation_date && <div><Badge style={{ color: "darkgrey" }}> posted: {this.getDate(post.creation_date)} </Badge> </div>}
          {
            post.tags && this.getFilteredTags(post.tags).map((tag, j) => {
              return (
                <Badge
                  key={j}
                  variant="secondary"
                  style={{ margin: ".2rem" }}
                > {tag} </Badge>
              );
            })
          }
          <Row>
            <Col>
              {
                !this.props.display && !this.props.offer &&
                <YouDevButton
                  disabled={!loggedIn() || userIsOwner}
                  style={{ marginTop: ".3rem" }}
                  text="Contact"
                  onClick={() => this.props.onContact(post)}
                />
              }
            </Col>
            <Col>
              <Row>
                {
                  post.user && post.user.avgRating ? <Rating ratings={post.user.avgRating} /> : <Rating ratings={0} />
                }
              </Row>
              <Row>
                <Badge>Completed: </Badge> {this.getCompleteBadge()}
              </Row>
            </Col>
          </Row>
          <Row style={{ padding: "8px 0px 4px 0px" }}>
            {
              !this.props.noHide && !this.props.offer &&
              <Col className="d-flex align-items-center justify-content-center">
                <BadgeButton variant="secondary" onClick={() => { this.props.onHidePost && this.props.onHidePost(post) }}> Hide </BadgeButton>
              </Col>
            }
            {
              userIsOwner && !this.props.offer && !this.props.noRemove &&
              <Col>
                <BadgeButton
                  variant="danger"
                  style={{ marginLeft: ".1rem" }}
                  onClick={() => { this.props.onRemovePost(post) }}
                >
                  Remove
                </BadgeButton>
              </Col>
            }
          </Row>
        </Card.Body>
        {
          this.props.offer &&
          <Card.Footer style={{ padding: "0px" }}>
            <OfferButton
              onOffer={() => { this.props.onOffer && this.props.onOffer(post) } }
            />
          </Card.Footer>
        }
      </Card>
    )
  }
}

export default Post;