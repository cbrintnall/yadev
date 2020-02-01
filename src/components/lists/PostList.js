import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import YouDevButton from '../YouDevButton';
import Rating from '../Rating';
import BadgeButton from '../buttons/BadgeButton';
import { humanized_time_span } from '../../extra/humanized_time';
import { differenceWith, isEqual } from 'lodash';
import { userToken, getTokenInfo, loggedIn } from '../../utils';
import { removePost } from '../../calls';

const OK_START = 10;
const OK_END = 30;
const GOOD_END = 60;
const AMAZING_END = 100;

export class Post extends React.Component {
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
              <Badge>${post.price}</Badge> {post.price == 0 && <span style={{ fontSize: "20px" }}><Badge variant="success"><u>Free</u></Badge></span>}
            </h4>
          </Card.Subtitle>
          <Card.Text style={{ backgroundColor: "#AEB3FF", padding: ".5rem", borderRadius: ".5rem" }}>
            <span
              style={{ textShadow: "1px 1px 2px black, 0 0 1em blue, 0 0 0.2em", color: "white" }}
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
                !this.props.display &&
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
          <Row style={{padding: "8px 0px 4px 0px"}}>
            {
              !this.props.noHide && 
              <Col>
                <BadgeButton variant="secondary" onClick={() => { this.props.onHidePost && this.props.onHidePost(post) }}> Hide </BadgeButton>
              </Col>
            }
            {userIsOwner && <Col><BadgeButton variant="danger" style={{ marginLeft: ".1rem" }} onClick={() => { this.props.onRemovePost(post) }}> Remove </BadgeButton></Col>}
          </Row>
        </Card.Body>
      </Card>
    )
  }
}

export default class PostList extends React.Component {
  constructor() {
    super();

    this.getNonHiddenPosts = this.getNonHiddenPosts.bind(this);
    this.createPosts = this.createPosts.bind(this);
    this.onContact = this.onContact.bind(this);
    this.onHidePost = this.onHidePost.bind(this);

    this.state = {
      hiddenPosts: []
    }
  }

  onContact(post) {
    if (this.props.onContact !== undefined) {
      this.props.onContact(post)
    }
  }

  onRemovePost(post) {
    removePost(post._id, userToken())
      .then(res => {
        this.onHidePost(post)
      })
      .catch(err => {
        console.log(err)
      })
  }

  onHidePost(post) {
    let hiddenPosts = this.state.hiddenPosts;
    hiddenPosts.push(post);

    this.setState({ hiddenPosts });
  }

  getNonHiddenPosts() {
    if (this.state.hiddenPosts.length === 0) {
      return this.props.posts;
    }

    return differenceWith(this.props.posts, this.state.hiddenPosts, isEqual);
  }

  createPosts() {
    const posts = this.getNonHiddenPosts() || []

    return posts.map((post, i) => {
      return (
        <Col 
          key={i}
          xs={{ span: "auto" }}
          sm={{ span: "auto" }}
          md={{ span: "auto" }}
          lg={{ span: "auto" }}
        >
          <Post
            display={this.props.display}
            post={post}
            onHidePost={this.onHidePost}
            onRemovePost={this.onRemovePost}
            onContact={this.onContact}
          />
        </Col>
      )
    })
  }

  render() {
    return (
      <Container>
        <Row>
          {this.createPosts()}
        </Row>
      </Container>
    )
  }
}
