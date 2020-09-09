import React from 'react'
import upvoteArrow from './Images/upvote_arrow.png'
import downvoteArrow from './Images/downvote_arrow.png'

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
                    <img id="upvote" src={upvoteArrow} alt="upvote"/>
                :
                    <img id="upvote" onClick={event => this.props.voteHandler(event.target.id, this.props.comment)} src={upvoteArrow} alt="upvote"/>
                }
                {`\xa0`}{`\xa0`}
                <strong>{this.props.comment.vote_tally}</strong>
                {`\xa0`}{`\xa0`}
                {this.checkIfVoted() 
                ? 
                    <img id="downvote" src={downvoteArrow} alt="downvote"/>
                :
                    <img id="downvote" onClick={event => this.props.voteHandler(event.target.id, this.props.comment)} src={downvoteArrow} alt="downvote"/>
                }                       
            </>
        )
    }
}

export default Comment