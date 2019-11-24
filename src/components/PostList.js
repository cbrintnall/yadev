import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import YouDevButton from './YouDevButton';
import Rating from './Rating';
import { getTokenInfo } from '../utils';

const OK_START = 10;
const OK_END = 30;
const GOOD_END = 60;
const AMAZING_END = 100;

class Post extends React.Component {
    constructor() {
        super();
    }

    getCompleteBadge() {
        if (!this.props.post.user || !this.props.post.user.completed) {
          return (<Badge>N/A</Badge>)
        }

        let variant = "danger";
        const { post: { user: { completed } } } = this.props;

        if (completed >= OK_START && completed < OK_END) {
            variant = "warning"
        }

        if (completed >= OK_END && completed < GOOD_END) {
            variant = "success"
        }

        if (completed >= GOOD_END && completed < AMAZING_END) {
            variant = "primary"
        }

        if (completed >= AMAZING_END) {
            variant = "info"
        }

        return (<Badge variant={variant}>{String(completed)}</Badge>)
    }

    getShadow() {
        const { post } = this.props;

        if (post.hasBeenAccepted && post.contacted) {
            return "#7AFF99";
        }

        if (!post.hasBeenAccepted && post.contacted) {
            return "#FFFB7A";
        }

        return "LightGray";
    }

    getDate(dateString) {
      if (!dateString) {
        return "";
      }

      const date = new Date(dateString);
      const day = String(date.getDay()).length == 1 ? "0" + date.getDay() : date.getDay();
      const minutes = String(date.getMinutes()).length == 1 ? "0" + date.getMinutes() : date.getMinutes();
    
      return `${date.getMonth()} / ${day} / ${date.getFullYear()} @ ${date.getHours()}:${minutes}`
    }

    removePost() {
      
    }

    render() {
        const { post } = this.props;    
        const userIsOwner = post.owner === getTokenInfo()._id;

        return (
        <Card style={{ 
                width: '18rem', 
                borderRadius: '2rem', 
                margin: "1rem",
                boxShadow: ("10px -10px " + this.getShadow()),
                border: "4px solid black"
            }}
        >
            <Card.Body>
                <Card.Title>
                  <h2 style={{borderBottom: "3px solid black"}}>
                    {post.type.charAt(0).toUpperCase() + post.type.substring(1)}
                  </h2> 
                  <Badge variant="secondary" onClick={this.props.onHidePost && this.props.onHidePost(post)}> Hide </Badge>
                  { userIsOwner ? <Badge variant="danger" style={{marginLeft: ".1rem"}} onClick={this.removePost.bind(this)}> Remove </Badge> : <span></span> }
                </Card.Title> 
                <Card.Subtitle> 
                    <h4>
                        <Badge>${post.price}</Badge> 
                    </h4>
                </Card.Subtitle>
                <Card.Text style={{ backgroundColor: "#AEB3FF", padding: ".5rem", borderRadius: ".5rem" }}>
                    <span
                        style={{textShadow: "1px 1px 2px black, 0 0 1em blue, 0 0 0.2em", color: "white"}}
                    >{post.description}</span>
                </Card.Text>
                {
                  post.tags ? post.tags.map((tag, j) => {
                        return (
                            <Badge 
                                key={j}
                                variant="secondary"
                                style={{ margin: ".2rem" }}
                            > {tag} </Badge>
                        );
                  }) : <span></span>
                }
                <Row>
                    <Col>
                        <YouDevButton 
                        style={{marginTop: ".3rem"}} 
                        text="Contact"
                        onClick={() => this.props.onContact(post)}
                    />
                    </Col>
                    <Col>
                        <Row>
                            {
                              post.user && post.user.avgRating ? 
                                <Rating ratings={post.user.avgRating}/> : <Rating ratings={0}/>
                            }
                        </Row>
                        <Row>
                            <Badge>Completed: </Badge> {this.getCompleteBadge()}
                        </Row>
                    </Col>
                </Row>
                {/*Commented out until we can make it look better*/}
                { /* <Badge variant="secondary"> { this.getDate(post.creation_date) } </Badge> */ }
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
