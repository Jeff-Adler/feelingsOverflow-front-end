import React from 'react';
import CommentModal from './CommentModal'

class CommentForm extends React.Component{

    state = {
        comment : ""
    }

    changeHandler = (event) => {
        this.setState({comment : event.target.value}, () => console.log(this.state.comment))
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.state.comment !== "" ? this.props.postComment(this.state) : alert("You need to write something!")
        this.setState({comment: ""})
    }

    render() {
        return (
            <>
                <CommentModal submitHandler={this.submitHandler} changeHandler={this.changeHandler} comment={this.state.comment} buttonLabel="Leave a comment?" text="test"/><br/>
            </>
        )
    }
}

export default CommentForm