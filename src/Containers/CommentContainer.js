import React from 'react'
import Comments from '../Components/Comments'
import CommentForm from '../Components/CommentForm'

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
                <div key={comment.id} className="comment_container">
                    <Comments key={comment.id} comment={comment}/>
                </div>
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
            <div>
                <h3>Comments</h3>
                    {this.state.isLoaded ? this.renderComments() : "Loading!"}<br/>
                    <CommentForm postComment={this.postComment}/>
            </div>
        )
    }
}

export default CommentContainer