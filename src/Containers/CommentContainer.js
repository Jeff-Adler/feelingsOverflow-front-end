import React from 'react'
import Comment from '../Components/Comment'
import CommentForm from '../Components/CommentForm'
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';

class CommentContainer extends React.Component {
    state = {
        comments:null,
        isLoaded:false
    }

    componentDidMount () {
        const token = localStorage.getItem("token")
        if (token) {
          fetch(`http://localhost:3000/posts/${this.props.postObj.id}/comments`, {
            method: "GET",
            headers: {
                        Authorization: `Bearer ${token}`
                     }
            })
              .then(response => response.json())
              .then(comments => {
                              this.setState({
                                    comments : comments,
                                    isLoaded : true
                                            })
                            }
                  )
        }
    }

    renderComments = () => {
        return (this.state.comments.map(comment => {
            return (
                <ListGroupItem>
                    <Comment key={comment.id} comment={comment}/>
                </ListGroupItem>
            )
        }))
    }

    postComment = (formData) => {
        const commentObj = { 
                comment:{
                        ...formData,
                        post_id:this.props.postObj.id
                        }
                    }

        const token = localStorage.getItem("token")
        fetch('http://localhost:3000/comments/', {
            method: "POST",
            headers: {
                        Authorization: `Bearer ${token}`,
                        "accepts" : "application/json",
                        "content-type" : "application/json"
                     },
            body: JSON.stringify(commentObj)
            })
              .then(response => response.json())
              .then(comment => {
                              this.setState({comments:[...this.state.comments,comment]})
                            }
                  )
    }

    render() {
        return (
            <>
                    {this.state.isLoaded 
                    ? 
                    <>
                        <CommentForm postComment={this.postComment}/>
                        <ListGroup className="list-group">
                            {this.renderComments()}
                        </ListGroup>
                    </>
                    : 
                    "Loading!"}
            </>
        )
    }
}

export default CommentContainer