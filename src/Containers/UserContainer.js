import React from 'react';
import {Route, Switch } from 'react-router-dom'
import NotFound from '../Components/Errors/404'
import UserEditForm from '../Components/UserEditForm'
import User from '../Components/User'
import UserPostContainer from './UserPostContainer'
import UserStats from '../Components/UserStats'
import UserPosts from '../Components/UserPosts'

class UserContainer extends React.Component {

state = {
        users:null,
        posts:null,
        unsortedPosts:null
        }

componentDidMount () {
    if (this.props.currentUser.id) {
        const token = this.props.getToken()
        this.retrieveUsers(token)
        this.retrieveMyPosts(token)
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

retrieveMyPosts = (token) => {
    fetch(`http://localhost:3000/api/v1/users/${this.props.currentUser.id}/posts`, {
            method: "GET",
            headers: {
                        Authorization: `Bearer ${token}`
                    }
            })  
                .then(response => response.json())
                .then(retrievedPosts => {
                    this.setState({
                        posts : [...retrievedPosts],
                        unsortedPosts : [...retrievedPosts]
                    })
                })
}

sortByCategory = () => {
    if (this.state.sorted === false) {
        const sortedPosts = this.state.posts.sort((a,b) => {
            return (
                a.mood_category.localeCompare(b.mood_category)
                )
        })
        this.setState({
            posts:[...sortedPosts],
            sorted:true
        })
    } else {
        const unsortedPosts = this.state.unsortedPosts 
        this.setState({
            posts:[...unsortedPosts],
            sorted:false
        })
    }
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
                        <Route exact path={`/users/${this.props.currentUser.id}/posts`} render={()=> {
                                return (
                                    <UserPosts user={this.props.currentUser} sortByCategory={this.sortByCategory} posts={this.state.posts}/>
                                )}
                        }/>
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
                        <Route exact path="/users/:id" render={({match})=> {
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