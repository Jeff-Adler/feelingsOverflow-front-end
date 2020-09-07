import React from 'react';
import Post from '../Components/Post'
import {Route, Switch} from 'react-router-dom'
import UserList from '../Components/UserList'
import NotFound from '../Components/Errors/404'

class UserContainer extends React.Component {

    state = {
        posts: null
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
        return (
            <>
                {this.state.posts === null 
                ?
                 <h1>LOADING</h1> 
                :
                    <>
                        <br/><br/>
                        <Switch>
                            <Route exact path="/user/info" render={() => <h1>My Info:</h1>}/>  
                            <Route exact path="/user/posts/:id" render={({match})=> {
                                let id = parseInt(match.params.id)
                                let foundPost = this.state.posts.find((post) => post.id ===id)
                                return (
                                    foundPost ? <Post postObj={foundPost} user={this.props.user}/> : <h3>Not Found</h3>
                                )
                            }} 
                            />
                            <Route exact path="/user/posts" render={() => <UserList posts={this.state.posts} />}/>
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