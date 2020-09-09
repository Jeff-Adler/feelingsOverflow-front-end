import React from 'react'
import upvoteEnabled from './Images/upvoteEnabled.png'
import downvoteEnabled from './Images/downvoteEnabled.png'
import upvoteDisabled from './Images/upvoteDisabled.png'
import downvoteDisabled from './Images/downvoteDisabled.png'

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
                {`${this.props.comment.comment} Commenter: ${this.props.comment.commenter_id}`}<br/>
                {this.checkIfVoted() 
                ? 
                    <img id="upvote" src={upvoteDisabled} alt="upvote"/>
                :
                    <img id="upvote" style={{cursor:"pointer"}} onClick={event => this.props.voteHandler(event.target.id, this.props.comment)} src={upvoteEnabled} alt="upvote"/>
                }
                {`\xa0`}{`\xa0`}
                <strong>{this.props.comment.vote_tally}</strong>
                {`\xa0`}{`\xa0`}
                {this.checkIfVoted() 
                ? 
                    <img id="downvote" src={downvoteDisabled} alt="downvote"/>
                :
                    <img id="downvote" style={{cursor:"pointer"}} onClick={event => this.props.voteHandler(event.target.id, this.props.comment)} src={downvoteEnabled } alt="downvote"/>
                }                       
            </>
        )
    }
}

export default Comment