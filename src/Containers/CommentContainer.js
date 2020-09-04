import React from 'react'
import Comments from '../Components/Comments'
import CommentForm from '../Components/CommentForm'


class CommentContainer extends React.Component {
    render() {
        return (
            <>
            {/* <h3>This is the comment container</h3> */}
                <Comments />
                <CommentForm />
            </>
        )
    }
}

export default CommentContainer