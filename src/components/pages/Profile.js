import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import settings from '../../settings';
import PostList from '../lists/PostList';
import { getTokenInfo } from '../../utils';
import { getUsersPosts } from '../../calls';

class Profile extends React.Component {
  constructor() {
    super();

    this.info = getTokenInfo();

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    getUsersPosts(this.info._id)
      .then(res => {
        this.setState({ posts: res.data.results })
      })
  }

  render() {
    return (
      <Row>
        <Col
          style={{
            height: "50vh",
            width: "50%",
            backgroundColor: "lightGray",
            margin: "0px 24px 24px 36px",
            borderRadius: "12px",
            paddingTop: "12px"
          }}
        >
          <h2>User Info:</h2>
          <hr />
          <span>Username: {this.info.username}</span>
          <br />
          <span>Email: {this.info.email}</span>
          <br />
          <span>Name: {this.info.name}</span>
          <br />
          <span>You've completed <em>{this.info.completed}</em> jobs</span>
          <br />
          <span style={{ fontSize: "8px" }}>Editing coming soon.. <a href={settings.source}>bug me here</a></span>
        </Col>
        <Col>
          <PostList
            posts={this.state.posts}
          />
        </Col>
      </Row>
    )
  }
}

export default Profile;