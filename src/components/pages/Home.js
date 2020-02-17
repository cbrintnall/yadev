import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostList from '../lists/PostList';
import Container from 'react-bootstrap/Container';
import ContactModal from '../modals/ContactModal';
import { getPosts, getUsersRatings, getUser } from '../../calls';
import GlobalNotificationManager from '../../gnm';
import { loggedIn } from '../../utils';
import HomeRightBar from './components/HomeRightBar';
import HomeLeftBar from './components/HomeLeftBar';
import CreatePost from '../panels/CreatePost';

class Home extends React.Component {
  constructor() {
    super()

    this.state = {
      showLoginModal: false,
      showContactModal: false,
      currentContact: {},
      currentPage: 1,
      posts: []
    }

    this.getUserInfo = this.getUserInfo.bind(this);
    this.onContact = this.onContact.bind(this);
    this.onNewPost = this.onNewPost.bind(this);

    GlobalNotificationManager.subscribe('newPost', this.onNewPost);
  }

  onContact(contact) {
    this.setState({
      showContactModal: true,
      currentContact: contact,
      loggedIn: false
    })
  }

  onNewPost(post) {
    const posts = this.state.posts;
    posts.push(post)

    this.setState({ posts }, () => console.log(this.state))
  }

  setPosts() {
    if (!loggedIn()) return;

    getPosts(this.state.currentPage)
      .then(res => {
        this.setState({
          posts: res.data.results
        })

        this.getUserInfo();
      })
      .catch(err => {
        GlobalNotificationManager.sendAlert('There was an error retrieving posts - please report this down below.', false)
      });
  }

  getUserInfo() {
    const users = this.state.posts.map(val => val.owner);

    getUsersRatings(users)
      .then(res => {
        const userRatings = {};

        res.data.forEach(rating => {
          userRatings[rating._id] = rating.avgRating
        })

        // Modify the posts to now include the rating
        this.setState({
          posts: this.state.posts.map(val => {
            return {
              ...val,
              user: {
                avgRating: userRatings[val.owner]
              }
            }
          })
        })
      })
      .catch(err => {
        console.log(err)
      })

    //get users completion amount
  }

  onRefresh() {
    this.setPosts();
  }

  componentDidMount() {
    this.setPosts()
  }

  render() {
    if (!loggedIn()) {
      this.props.history.push('/landing')
    }

    return (
      <div>
        <Container style={{ margin: "0px", maxWidth: "100%" }}>
          <Row>
            <HomeLeftBar
              lg={2}
              md={3}
              sm={4}
            />
            <Col
              style={{ marginTop: "16px" }}
              lg={8}
              md={6}
              sm={8}
            >
              <CreatePost
              />
              <PostList
                style={{marginTop: "30px"}}
                posts={this.state.posts}
                onContact={this.onContact}
              />
            </Col>
            <HomeRightBar
              lg={2}
              md={3}
            />
            <ContactModal
              contact={this.state.currentContact}
              show={this.state.showContactModal}
              onHide={() => this.setState({ showContactModal: false })}
              onSubmit={() => this.setState({ showContactModal: false })}
            />
          </Row>
        </Container>
      </div>
    )
  }
}

export default Home;
