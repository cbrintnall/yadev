import React from 'react';
import PostList from './PostList';
import Container from 'react-bootstrap/Container';
import ContactModal from './ContactModal';
import Nav from 'react-bootstrap/Nav';
import { getPosts } from '../calls';
import { IoIosRefresh } from 'react-icons/io';

function createFakePosts() {
    let amt = 10;
    let obj = {
        user: {
            username: "Jon101",
            avgRating: 2,
            completed: 100
        },
        description: "Need a Youtuber with gaming experience, 500+ subscribers required. Need promotion for new action adventure indie game.",
        askingPrice: 50,
        isDev: true,
        tags: ["Urgent", "Indie"],
        willWork: true,
        hasBeenAccepted: true,
        contacted: true
    };

    let arr = [];
    for (let i = 0; i < amt; i ++) arr.push(obj)

    return arr;
  }

export default class Home extends React.Component {
    constructor() {
        super()

        this.state = {
            showLoginModal: false,
            showContactModal: false,
            currentContact: {},
            currentPage: 1,
            posts: []
        }

        this.refreshRef = React.createRef();
        this.onContact = this.onContact.bind(this);
    }

    onContact(contact) {
        this.setState({
            showContactModal: true,
            currentContact: contact,
            loggedIn: false
        })
    }

    setPosts() {
      getPosts(this.state.currentPage)
        .then(res => {
          this.setState({
            posts: res.data.results
          })
        })
        .catch(err => {
          console.log(err);
        });
    }

    onRefresh() {
      this.setPosts();
    }

    componentDidMount() {
      this.setPosts()
    }

    render() {
        return (
            <div>
                <Container>
                    <Nav className="justify-content-end" style={{margin: "1rem"}}>
                      <Nav.Item>
                        <h3>
                          <IoIosRefresh 
                            ref={this.refreshRef}
                            onClick={this.onRefresh.bind(this)}
                          />
                        </h3>
                      </Nav.Item>
                    </Nav>
                    <ContactModal 
                        contact={this.state.currentContact}
                        show={this.state.showContactModal}
                        onHide={() => this.setState({showContactModal: false})}
                    />
                    <PostList 
                        posts={this.state.posts}
                        onContact={this.onContact}
                    />
                </Container>
            </div>
        )
    }
}
