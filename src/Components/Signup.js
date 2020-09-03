import React from 'react'

class Signup extends React.Component {
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
            <form onSubmit={event => this.submitHandler(event)}>
                <input type="text" name="username" placeholder="username" value={this.state.username} onChange={event => this.changeHandler(event)} />
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={event => this.changeHandler(event)} />
                <input type="submit" value="Sign-up!"/>
            </form>
        )
    }
}

export default Signup