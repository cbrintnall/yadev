import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import PostList from './PostList';
import Container from 'react-bootstrap/Container';

function createFakePosts() {
    let obj = {
        user: {
            username: "Jon101"
        },
        description: "Need a Youtuber with gaming experience, 500+ subscribers required. Need promotion for new action adventure indie game.",
        askingPrice: 50,
        isDev: true,
        tags: ["Urgent", "Indie"],
        avgRating: 5
        // createdAt: 
    };

    let arr = [];
    for (let i = 0; i < 5; i ++) arr.push(obj)

    return arr;
  }

export default class Home extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <Navbar expand="lg" style={{backgroundImage: "linear-gradient(#A1D9FF, #CEA1FF)", borderBottom: "3px solid black"}}>
                    <Navbar.Brand href=""><h2>You | Dev</h2></Navbar.Brand>
                </Navbar>
                <Container>
                    <PostList posts={createFakePosts()}/>
                </Container>
            </div>
        )
    }
}