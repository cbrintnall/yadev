import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import settings from '../../settings';
import PostList from '../lists/PostList';
import { getTokenInfo } from '../../utils';
import { getUsersPosts, getUserProfileInfo } from '../../calls';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      user: {}
    }
  }

  componentDidMount() {
    const promises = [
      getUsersPosts(getTokenInfo()._id),
      getUserProfileInfo()
    ]

    Promise.all(promises)
      .then(all => {
        console.log(all)
        this.setState({
          posts: all[0].data.results,
          user: all[1].data
        })
      })
      .catch(err => {
        console.error(err)
      });
  }

  render() {
    return (
      <Container
        style={{
          width: "100%",
          maxWidth: "100%"
        }}
      >
        <Row style={{ marginTop: "24px" }}>
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
            <span>Username: {this.state.user.username}</span>
            <br />
            <span>Email: {this.state.user.email}</span>
            <br />
            <span>Name: {this.state.user.name}</span>
            <br />
            <span>You've completed <em>{this.state.user.completed}</em> jobs</span>
            <br />
            <span style={{ fontSize: "8px" }}>Editing coming soon.. <a href={settings.source}>bug me here</a></span>
          </Col>
          <Col>
            <PostList
              posts={this.state.posts}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Profile;
