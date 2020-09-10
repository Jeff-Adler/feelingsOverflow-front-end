import React from 'react';
import Post from '../Components/Post'
import {Route, Switch } from 'react-router-dom'
import UserList from '../Components/UserList'
import UserProfile from '../Components/UserProfile'
import NotFound from '../Components/Errors/404'
import UserEditForm from '../Components/UserEditForm'
import UserAnalytics from '../Components/UserAnalytics'
// import OtherUserList from '../Components/OtherUserList'

class UserContainer extends React.Component {

state = {
        posts: null,
        unsortedPosts : null,
        users:null,
        sorted : false
        }


submitHandler = (userObj) => {
    
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

retrievePosts = (token) => {
    fetch(`http://localhost:3000/users/${this.props.user.id}/posts`, {
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

componentDidMount () {
    if (this.props.user.id) {
        const token = this.props.getToken()
        this.retrievePosts(token)
        this.retrieveUsers(token)
    }
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

render () {
    return (
        <>
            {this.state.posts === null || this.state.users === null
            ?
                ""
            :
                <>
                    <br/><br/>
                    <Switch>
                        <Route exact path="/user/info" render={() => <UserProfile userObj={this.props.user} />}/>  
                        <Route exact path="/user/posts/:id" render={({match})=> {
                            let id = parseInt(match.params.id)
                            let foundPost = this.state.posts.find((post) => post.id ===id)
                            return (
                                foundPost ? <Post postObj={foundPost} user={this.props.user} deleteHandler={this.props.deleteHandler}/> : <h3>Not Found</h3>
                            )
                        }} 
                        />
                        <Route exact path="/user/:id/analytics" render={({match})=> {
                            let id = parseInt(match.params.id)
                            let foundUser = this.state.users.find((user) => user.id ===id)
                            return (
                                foundUser ? <UserAnalytics user={foundUser}/> : <h3>Not Found</h3>
                            )
                        }} />
                        <Route exact path="/user/posts" render={() => <UserList sortByCategory={this.sortByCategory} user={this.props.user} posts={this.state.posts} />}/>
                        {/* Requires refactoring: */}
                        {/* <Route exact path="/user/:id/posts" render={({match})=> {
                            let id = parseInt(match.params.id)
                            let foundUser = this.state.users.find((user) => user.id === id)
                            console.log(foundUser)
                            return (
                                foundUser ? <OtherUserList getToken={this.props.getToken} user={foundUser}/> : <h3>Not Found</h3>
                            )
                        }}/> */}
                        <Route exact path="/user/edit" render={() => <UserEditForm submitHandler={this.submitHandler} locationChangeHandler={this.locationChangeHandler} userObj={this.props.user} />}/>
                        <Route exact path="/user" render={() => <UserList posts={this.state.posts} />}/>
                        <Route component={NotFound} />
                    </Switch>
                </>
            }
        </>
    )
}
}

export default UserContainer