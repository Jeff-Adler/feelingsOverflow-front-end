import React from 'react';
import Post from '../Components/Post'
import {Route, Switch } from 'react-router-dom'
import UserList from '../Components/UserList'
import UserProfile from '../Components/UserProfile'
import NotFound from '../Components/Errors/404'
import UserEditForm from '../Components/UserEditForm'

class UserContainer extends React.Component {

state = {
        posts: null
        }


submitHandler =(userObj) => {
    
    let newUser = {
        age: userObj.age,
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
        body: JSON.stringify(newUser)
    }

    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`, configObj)
    .then(response => response.json())
    .then(newUserObj => {
            this.props.history.push(`/user/info`)
            window.location.reload()
    })

}


componentDidMount () {
    if (this.props.user.id) {
        const token = this.props.getToken()
        fetch(`http://localhost:3000/users/${this.props.user.id}/posts`, {
            method: "GET",
            headers: {
                        Authorization: `Bearer ${token}`
                    }
            })
                .then(response => response.json())
                .then(posts => {
                this.setState({posts:posts})
                })
    }
}

render () {
    console.log(this.props.user)
    return (
        <>
            {this.state.posts === null 
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
                                foundPost ? <Post postObj={foundPost} user={this.props.user}/> : <h3>Not Found</h3>
                            )
                        }} 
                        />
                        <Route exact path="/user/posts" render={() => <UserList posts={this.state.posts} />}/>
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