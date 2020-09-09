import React from 'react'
import { Button } from 'reactstrap';

class Comment extends React.Component {

    checkIfVoted = () => {
        return (
            this.props.votedComments.some(votedComment => {
                return (
                    votedComment.id === this.props.comment.id
                )
            })
        )
    }

    render () {
        return (
            <>
                {`${this.props.comment.comment} Commenter: ${this.props.comment.commenter_id}`}
                <p>Votes: {this.props.comment.vote_tally}</p>   
                {this.checkIfVoted()
                ?
                "Already Voted"
                :
                    <>
                        <Button value="upvote" onClick={event => this.props.voteHandler(event.target.value, this.props.comment)}>Upvote</Button>
                        <Button value="downvote" onClick={event => this.props.voteHandler(event.target.value, this.props.comment)}>Downvote</Button> 
                    </>
                }           
            </>
        )
    }
}

export default Comment