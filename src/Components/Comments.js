import React from 'react'
import { Button } from 'reactstrap';

class Comments extends React.Component {
    
    upVoteHelper = () => {
        this.props.upVoteHandler(this.props.comment)
    }

    downVoteHelper = () => {
        this.props.downVoteHandler(this.props.comment)
    }
    
    
    render () {

        return (
            <>
                <p>Comment: {this.props.comment.comment}</p>
                <p>Commenter: {this.props.comment.commenter_id}</p>
                <p>Votes: {this.props.comment.votes}</p>
                <Button onClick={this.upVoteHelper}>Upvote</Button>
                <Button onClick={this.downVoteHelper}>Downvote</Button>
                <br/>
            </>
        )
    }

}

export default Comments