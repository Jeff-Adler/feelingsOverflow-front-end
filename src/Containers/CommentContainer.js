import React from 'react'
import Comment from '../Components/Comment'
import {ListGroup, ListGroupItem} from 'reactstrap';
import ModalForm from '../Components/ModalForm'

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
                              this.setState({comments:[...this.state.comments,comment]}, () => console.log(comment))
                            }
                  )
    }

    voteHandler = (voteType,commentId) => {
        let upvote = true
        if (voteType === "downvote") {
            upvote = false
        }

        const voteObj = {
            upvote : upvote
        }

        const token = localStorage.getItem("token")
        const configObj = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({vote: voteObj})
        }  

        fetch(`http://localhost:3000/comments/${commentId}/votes/create`, configObj)
            .then(resp => resp.json())
            .then(commentObj => { 
                const commentIndex = this.state.comments.findIndex(comment => {
                    return(
                        comment.id === commentId
                    )
                })
                this.state.comments[commentIndex] = commentObj
                this.setState({comments:this.state.comments})
            })
    }

    renderComments = () => {
        return (this.state.comments.map(comment => {
            return (
                <ListGroupItem key={comment.id}>
                    <Comment comment={comment} voteHandler={this.voteHandler}/>
                </ListGroupItem>
            )
        }))
    }
        
    render() {
        return (
            <>
                    {this.state.isLoaded 
                    ? 
                    <>
                        <ModalForm postComment={this.postComment} parentComponent={"commentContainer"} buttonLabel="Leave a comment?"/><br/>
                        <ListGroup className="list-group">
                            {this.renderComments()}
                        </ListGroup>
                    </>
                    : 
                    ""}
            </>
        )
    }
}

export default CommentContainer