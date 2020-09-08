import React from 'react'

class Comment extends React.Component {
    render () {
        return (
            <>
                {`${this.props.comment.comment}\xa0${this.props.comment.commenter_id}`}        
            </>
        )
    }
}

export default Comment