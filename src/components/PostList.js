import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import YouDevButton from './YouDevButton';
import Rating from './Rating';

class Post extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
        <Card style={{ 
                width: '18rem', 
                borderRadius: '2rem', 
                margin: "1rem",
                boxShadow: "5px 10px #888888",
                border: "4px solid black"
            }} 
        >
            <Card.Body>
                <Card.Title><h2 style={{borderBottom: "3px solid black"}}>{this.props.post.isDev ? "Youtuber" : "Developer"}</h2></Card.Title> 
                <Card.Subtitle> 
                    <h4>
                        <Badge>${this.props.post.askingPrice}</Badge> 
                    </h4>
                </Card.Subtitle>
                <Card.Text style={{ backgroundColor: "#AEB3FF", padding: ".5rem", borderRadius: ".5rem" }}>
                    <span
                        style={{textShadow: "1px 1px 2px black, 0 0 1em blue, 0 0 0.2em", color: "white"}}
                    >{this.props.post.description}</span>
                </Card.Text>
                {
                    this.props.post.tags.map((tag, j) => {
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
                        <YouDevButton 
                        style={{marginTop: ".3rem"}} 
                        text="Contact"
                        onClick={() => this.props.onContact(this.props.post)}
                    />
                    </Col>
                    <Col>
                        <Rating ratings={this.props.post.avgRating}/>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        )
    }
}

export default class PostList extends React.Component {
    constructor() {
        super();

        this.createPosts = this.createPosts.bind(this);
        this.onContact = this.onContact.bind(this);
    }

    onContact(post) {
        if (this.props.onContact !== undefined) {
            this.props.onContact(post)
        }
    }

    createPosts() {
        return this.props.posts.map((post, i) => {
            return (
                <Col key={i}>
                    <Post
                        post={post}
                        onContact={this.onContact}
                    />
                </Col>
            )
        })
    }

    render() {
        return (
            <Row>
                {this.createPosts()}
            </Row>
        )
    }
}