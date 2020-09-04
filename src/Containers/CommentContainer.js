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
                                            }, 
                                            () => console.log(this.state.comments)
                                            )
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

    render() {
        return (
            <div>
                <h3>Comments</h3>
                    {this.state.isLoaded ? this.renderComments() : "Loading!"}<br/><br/>
                    <CommentForm />
            </div>
        )
    }
}

export default CommentContainer