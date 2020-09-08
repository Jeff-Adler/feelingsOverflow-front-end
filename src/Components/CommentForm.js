import React from 'react';

class CommentForm extends React.Component{

    state = {
        comment : "",
        votes: 0
    }

    changeHandler = (event) => {
        this.setState({comment : event.target.value})
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.state.comment !== "" ? this.props.postComment(this.state) : alert("You need to write something!")
        this.setState({comment: ""})
    }

    render() {
        return (
            <>
                <p>Comment Form</p>
                <form onSubmit={event => this.submitHandler(event)}>
                    <input type="textarea" placeholder="write a comment" value={this.state.comment} onChange={event => this.changeHandler(event)}/>
                    <input type="submit"/>
                </form>
            </>
        )
    }
}

export default CommentForm