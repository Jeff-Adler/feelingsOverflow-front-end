import React from 'react'
import { Button, Form, FormGroup, Label, Input, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    changeHandler = (event) => {
        event.persist()
        this.setState({[event.target.name] : event.target.value})
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.submitHandler(this.state)
    }

    render () {
        return (
            <>
            <br/><br/>
            <h1>PillowTalk.</h1>
            <h3>because we all have a voice.</h3>
            <br/><br/>
            <h4>Returning User</h4>
            <div className="center">
            <Form onSubmit={event => this.submitHandler(event)} style={{ width: "300px" }}>

                <FormGroup>
                    <Label for="username" className="mr-sm-2">Username</Label>
                    <Input type="text" name="username" placeholder="username" value={this.state.username} onChange={event => this.changeHandler(event)} />
                </FormGroup>

                <FormGroup>
                    <Label for="password" className="mr-sm-2">Password</Label>
                    <Input type="password" name="password" placeholder="password" value={this.state.password} onChange={event => this.changeHandler(event)} />
                </FormGroup>

                <Button type="submit" value="Login">Submit</Button>

            </Form>
            </div>
                <NavLink tag={Link} to="/signup">New here? Sign up!</NavLink>
            </>
        )
    }
}



export default Login