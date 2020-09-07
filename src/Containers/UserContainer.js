import React from 'react';
import Post from '../Components/Post'
import {Route, Switch} from 'react-router-dom'
import UserList from '../Components/UserList';

class UserContainer extends React.Component {

    state = {posts: null}

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
                <br/><br/>
                <h1>User Page</h1>
                <Switch>
                    <Route path="/user/info" exact render={() => {
                       return(
                            <h1>My Info:</h1>
                       )
                    }
                    }
                    />  
                    <Route exact path="user/posts/:id" render={({match})=> {
                        let id = parseInt(match.params.id)
                        let foundPost = this.state.posts.find((post) => post.id ===id)
                        return <Post postObj={foundPost} user={this.props.user}/>
                    }} />
                   <Route path="/user/posts" render={() => {
                    return(
                        <div>
                            {this.state.posts !==  null  ? <UserList posts={this.state.posts} /> : "Loading!"}
                        </div>
                            )
                        }
                    }
                   />
                </Switch>
            </>
        )
    }
}

export default UserContainer