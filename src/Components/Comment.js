import React from 'react'
import { Button } from 'reactstrap';

class Comment extends React.Component {

    render () {
        return (
            <>
                {`${this.props.comment.comment} Commenter: ${this.props.comment.commenter_id}`}
                <p>Votes: {this.props.comment.vote_tally}</p>     
                <Button value="upvote" onClick={event => this.props.voteHandler(event.target.value, this.props.comment.id)}>Upvote</Button>
                <Button value="downvote" onClick={event => this.props.voteHandler(event.target.value, this.props.comment.id)}>Downvote</Button>   
            </>
        )
    }
}

export default Comment