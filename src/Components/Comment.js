import React from 'react'

class Comment extends React.Component {
    upVoteHelper = () => {
        this.props.upVoteHandler(this.props.comment)
    }

    downVoteHelper = () => {
        this.props.downVoteHandler(this.props.comment)
    }


    render () {
        return (
            <>
                {`${this.props.comment.comment} Commenter: ${this.props.comment.commenter_id}`}
                <p>Votes: {this.props.comment.votes}</p>
                <Button onClick={this.upVoteHelper}>Upvote</Button>
                <Button onClick={this.downVoteHelper}>Downvote</Button>        
            </>
        )
    }
}

export default Comment