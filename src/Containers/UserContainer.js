import React from 'react';
import Posts from '../Components/Posts'
import {Route, Switch} from 'react-router-dom'

class UserContainer extends React.Component {

    state = {isLoaded : false}

    componentDidMount () {
        if (this.props.user.id) {
            const token = localStorage.getItem("token")
            fetch(`http://localhost:3000/users/${this.props.user.id}/posts`, {
                method: "GET",
                headers: {
                            Authorization: `Bearer ${token}`
                        }
                })
                    .then(response => response.json())
                    .then(posts => {
                    this.setState({posts:posts,
                                    isLoaded:true},
                        ()=>console.log(this.state.posts))
                    })
        }
    }

    renderPosts = () => {
        return (
            this.state.posts.map(postObj => {
                return (
                    <Posts key={postObj.id} postObj={postObj}/>
                )
            })
        ) 
    }

    render () {
        return (
            <>
                <Switch>
                    <Route path="/profile/info" exact render={() => {
                       return(
                            <h1>My Info:</h1>
                       )
                    }
                    }
                    />  
                   <Route path="/profile" render={() => {
                       return(
                            <div>
                                <h1>My posts:</h1>
                                {this.state.isLoaded ? this.renderPosts() : "Loading!"}
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