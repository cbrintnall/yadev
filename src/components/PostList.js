import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import YouDevButton from './YouDevButton';

export default class PostList extends React.Component {
    constructor() {
        super();
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
                    <Card style={{ 
                        width: '18rem', 
                        borderRadius: '2rem', 
                        margin: "1rem",
                        boxShadow: "5px 10px #888888",
                        border: "4px solid black"
                    }} 
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
                                post.tags.map((tag, j) => {
                                    return (
                                        <Badge 
                                            key={j}
                                            variant="secondary"
                                            style={{ margin: ".2rem" }}
                                        > {tag} </Badge>
                                    );
                                })
                            }
                            <br />
                            <YouDevButton 
                                style={{marginTop: ".3rem"}} 
                                text="Contact"
                                onClick={() => this.onContact(post)}
                            ></YouDevButton>
                        </Card.Body>
                    </Card>
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