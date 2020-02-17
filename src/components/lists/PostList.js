import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Post from '../cards/Post';
import GlobalNotificationManager from '../../gnm';
import { differenceWith, isEqual } from 'lodash';
import { userToken } from '../../utils';
import { removePost } from '../../calls';

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
            {...this.props}
            post={post}
            onOffer={(e) => { this.props.onOffer && this.props.onOffer(e) }}
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
      <Row className="d-flex justify-content-center">
        {this.createPosts()}
      </Row>
    )
  }
}
