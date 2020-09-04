import React from 'react';

class CommentForm extends React.Component{
    render() {
        return (
            <>
                <p>Comment Form</p>
                <form>
                    <input type="text" placeholder="write a comment"/>
                    <input type="submit"/>
                </form>
            </>
        )
    }
}

export default CommentForm