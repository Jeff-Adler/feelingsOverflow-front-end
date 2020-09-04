import React from 'react'

class Comments extends React.Component {
    render () {
        return (
            <>
                <p>Comment: {this.props.comment.comment}</p>
                <p>Commenter: {this.props.comment.commenter_id}</p><br/>
            </>
        )
    }

}

export default Comments