import React from 'react';
import Post from '../Components/Post'
import {Route, Switch } from 'react-router-dom'
import UserList from '../Components/UserList'
import UserProfile from '../Components/UserProfile'
import NotFound from '../Components/Errors/404'
import UserEditForm from '../Components/UserEditForm'
import UserAnalytics from '../Components/UserAnalytics'
import OtherUserList from '../Components/OtherUserList'
import User from '../Components/User'
import UserPostContainer from './UserPostContainer'
import UserStats from '../Components/UserStats'

class UserContainer extends React.Component {

state = {
        // posts: null,
        // unsortedPosts : null,
        users:null
        // sorted : false
        }

componentDidMount () {
    if (this.props.currentUser.id) {
        const token = this.props.getToken()
        // this.retrievePosts(token)
        this.retrieveUsers(token)
    }
}

retrieveUsers = (token) => {
    fetch(`http://localhost:3000/api/v1/users`, {
            method: "GET",
            headers: {
                        Authorization: `Bearer ${token}`
                    }
            })
                .then(response => response.json())
                .then(users => {
                    this.setState({users:users})
                })
}

//Sends user info patch requests
editHandler = (userObj) => {
    
    let newUser = {
        birthdate: userObj.birthdate,
        gender: userObj.gender,
        location: userObj.location
    }

    const token = this.props.getToken()

    const configObj = {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({user:newUser})
    }

    fetch(`http://localhost:3000/api/v1/users/${this.props.currentUser.id}`, configObj)
        .then(response => response.json())
        .then(data => { 
                this.props.updateUser(data.user)               
                this.props.history.push(`/user/info`)
    })
}

render () {
    return (
        <>
            {this.state.users === null
            ?
                ""
            :
                <>
                    <br/><br/>
                    <Switch>
                        <Route path="/users/:id/posts" render={({match})=> {
                            let id = parseInt(match.params.id)
                            let foundUser = this.state.users.find((user) => user.id ===id)
                            return (
                                foundUser ? <UserPostContainer getToken={this.props.getToken} currentUser={this.props.currentUser} user={foundUser}/> : <h3>Not Found</h3>
                            )
                        }}/>
                        <Route exact path="/users/:id/edit" render={({match})=> {
                            let id = parseInt(match.params.id)
                            let foundUser = this.state.users.find((user) => user.id ===id)
                            return (
                                foundUser ? <UserEditForm editHandler={this.editHandler} currentUser={this.props.currentUser} user={foundUser}/> : <h3>Not Found</h3>
                            )
                        }}/>
                        <Route exact path="/users/:id/stats" render={({match})=> {
                            let id = parseInt(match.params.id)
                            let foundUser = this.state.users.find((user) => user.id ===id)
                            return (
                                foundUser ? <UserStats getToken={this.props.getToken} user={foundUser}/> : <h3>Not Found</h3>
                            )
                        }}/>
                        <Route exqct path="/users/:id" render={({match})=> {
                            let id = parseInt(match.params.id)
                            let foundUser = this.state.users.find((user) => user.id ===id)
                            return (
                                foundUser ? <User currentUser={this.props.currentUser} user={foundUser}/> : <h3>Not Found</h3>
                            )
                        }}/>
                        <Route component={NotFound} />
                    </Switch>
                </>
            }
        </>
    )
}
}

export default UserContainer