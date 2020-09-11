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

class UserContainer extends React.Component {

state = {
        // posts: null,
        // unsortedPosts : null,
        users:null
        // sorted : false
        }

componentDidMount () {
    if (this.props.user.id) {
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

    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`, configObj)
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
                        <Route exact path="/users/:id" render={({match})=> {
                            let id = parseInt(match.params.id)
                            let foundUser = this.state.users.find((user) => user.id ===id)
                            return (
                                foundUser ? <User editHandler={this.editHandler} users={this.state.users} currentUser={this.props.user} user={foundUser}/> : <h3>Not Found</h3>
                            )
                        }}/>
                        <Route component={NotFound} />



                        {/* Old Routes */}
                        {/* <Route exact path="/users/info" render={() => <UserProfile userObj={this.props.user} />}/>  
                        <Route exact path="/users/posts/:id" render={({match})=> {
                            let id = parseInt(match.params.id)
                            let foundPost = this.state.posts.find((post) => post.id ===id)
                            return (
                                foundPost ? <Post postObj={foundPost} user={this.props.user} deleteHandler={this.props.deleteHandler}/> : <h3>Not Found</h3>
                            )
                        }}  */}
                        {/* /> */}
                        {/* <Route exact path="/users/:id/analytics" render={({match})=> {
                            let id = parseInt(match.params.id)
                            let foundUser = this.state.users.find((user) => user.id ===id)
                            return (
                                foundUser ? <UserAnalytics user={foundUser}/> : <h3>Not Found</h3>
                            )
                        }} /> */}
                        {/* <Route exact path="/users/posts" render={() => <UserList sortByCategory={this.sortByCategory} user={this.props.user} posts={this.state.posts} />}/> */}
                        {/* <Route exact path="/user/:id/posts" render={({match})=> {
                            let id = parseInt(match.params.id)
                            let foundUser = this.state.users.find((user) => user.id === id)
                            console.log(foundUser)
                            return (
                                foundUser ? <OtherUserList getToken={this.props.getToken} user={foundUser}/> : <h3>Not Found</h3>
                            )
                        }}/> */}
                        {/* <Route exact path="/users/edit" render={() => <UserEditForm submitHandler={this.submitHandler} locationChangeHandler={this.locationChangeHandler} userObj={this.props.user} />}/>
                        <Route exact path="/users" render={() => <UserList posts={this.state.posts} />}/> */}
                        {/* <Route component={NotFound} /> */}
                    </Switch>
                </>
            }
        </>
    )
}
}

export default UserContainer