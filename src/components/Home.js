import React from 'react';
import PostList from './PostList';
import Container from 'react-bootstrap/Container';
import ContactModal from './ContactModal';

function createFakePosts() {
    let amt = 10;
    let obj = {
        user: {
            username: "Jon101"
        },
        description: "Need a Youtuber with gaming experience, 500+ subscribers required. Need promotion for new action adventure indie game.",
        askingPrice: 50,
        isDev: true,
        tags: ["Urgent", "Indie"],
        avgRating: 2
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
            currentContact: {}
        }

        this.onContact = this.onContact.bind(this);
    }

    onContact(contact) {
        this.setState({
            showContactModal: true,
            currentContact: contact,
            loggedIn: false
        })
    }

    render() {
        return (
            <div>
                <Container>
                    <ContactModal 
                        contact={this.state.currentContact}
                        show={this.state.showContactModal}
                        onHide={() => this.setState({showContactModal: false})}
                    />
                    <PostList 
                        posts={createFakePosts()}
                        onContact={this.onContact}
                    />
                </Container>
            </div>
        )
    }
}