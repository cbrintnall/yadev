import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default class PostList extends React.Component {
    constructor() {
        super();
    }

    createPosts() {
        let interval = 1;
        let posts = [];

        for (let i = interval; i < this.props.posts.length; i += interval) {
            let post = this.props.posts[i];
            posts.push(
                <Col>
                    <Card style={{ 
                        width: '18rem', 
                        borderRadius: '2rem', 
                        margin: "1rem",
                        boxShadow: "5px 10px #888888",
                        border: "4px solid black"
                    }} 
                    key={i}
                    >
                        <Card.Body>
                            <Card.Title><h2 style={{borderBottom: "3px solid black"}}>{post.isDev ? "Youtuber" : "Developer"}</h2></Card.Title> 
                            <Card.Subtitle> 
                                <h4>
                                    <Badge>${post.askingPrice}</Badge> 
                                </h4>
                            </Card.Subtitle>
                            <Card.Text style={{ backgroundColor: "#AEB3FF", padding: ".5rem", borderRadius: ".5rem" }}>
                                <span
                                    style={{textShadow: "1px 1px 2px black, 0 0 1em blue, 0 0 0.2em", color: "white"}}
                                >{post.description}</span>
                            </Card.Text>
                            {
                                post.tags.map(tag => {
                                    return (
                                        <Badge 
                                            variant="secondary"
                                            style={{ margin: ".2rem" }}
                                        > {tag} </Badge>
                                    );
                                })
                            }
                            <br />
                            <Button style={{marginTop: ".3rem", backgroundColor: "#A492E8"}}>Contact</Button>
                        </Card.Body>
                    </Card>
                </Col>
            )
        }

        return posts;
    }

    render() {
        return (
            <Row>
                {this.createPosts()}
            </Row>
        )
    }
}