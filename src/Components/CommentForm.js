import React from 'react';
import { Button, Form, FormGroup, Input} from 'reactstrap';

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
        this.props.toggle()
    }

    render() {
        return (
            <>
                <Form onSubmit={event => this.submitHandler(event)}>
                    <FormGroup>
                        <Input value={this.state.comment} onChange={event => this.changeHandler(event)} type="textarea" name="text" id="exampleText"/>
                    </FormGroup>
                    <Button color="secondary">Submit</Button>
                </Form>
            </>
        )
    }
}

export default CommentForm