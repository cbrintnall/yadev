import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostList from '../lists/PostList';
import PostFilter from '../PostFilter';
import Container from 'react-bootstrap/Container';
import ContactModal from '../ContactModal';
import Nav from 'react-bootstrap/Nav';
import { getPosts, getUsersRatings, getUser } from '../../calls';
import { IoIosRefresh } from 'react-icons/io';
import GlobalNotificationManager from '../../gnm';
import YouDevButton from '../YouDevButton';
import { loggedIn } from '../../utils';

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
      let posts = this.state.posts;
      posts.push(post)

      this.setState({ posts })
    }

    setPosts() {
      getPosts(this.state.currentPage)
        .then(res => {
          this.setState({
            posts: res.data.results
          })

          this.getUserInfo();
        })
        .catch(err => {
          console.log(err);
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
                <Container >
                    <Row>
                      <Col>
                      {/* <PostFilter
                        TODO: Add this back in!
                      /> */}
                      <Nav className="justify-content-start" style={{margin: "1rem"}}>
                        <Nav.Item>
                          <h3>
                            <IoIosRefresh
                              onClick={this.onRefresh.bind(this)}
                            />
                          </h3>
                        </Nav.Item>
                        {/* 
                        TODO: Add back in once hiding saves between sessions.
                        <Nav.Item>
                          <YouDevButton
                            text="Show All"
                            style={{
                              display: "inline-block",
                              marginLeft: "12px",
                              marginTop: "3px"
                            }}
                          />
                        </Nav.Item> */}
                      </Nav>
                      </Col>
                    </Row>
                    <Row>
                      <ContactModal
                          contact={this.state.currentContact}
                          show={this.state.showContactModal}
                          onHide={() => this.setState({showContactModal: false})}
                          onSubmit={() => this.setState({showContactModal: false})}
                      />
                      <PostList
                          posts={this.state.posts}
                          onContact={this.onContact}
                      />
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;
