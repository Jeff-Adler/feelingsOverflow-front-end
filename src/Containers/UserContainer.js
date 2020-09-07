import React from 'react';
import Posts from '../Components/Post'
import {Route, Switch} from 'react-router-dom'
import { Table } from 'reactstrap';
import Search from '../Components/Search'

class UserContainer extends React.Component {

    state = {isLoaded : false}

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
                    this.setState({posts:posts,
                                    isLoaded:true})
                    })
        }
    }

    renderPosts = () => {
        return (
            this.state.posts.map(postObj => {
                return (
                    <Posts key={postObj.id} user={this.props.user} postObj={postObj}/>
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
                                <br/><br/>
                                <h1>My posts</h1>
                                {this.state.isLoaded ? 
                    <>
                    <Search />
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Post id</th>
                                    <th>Post Description</th>
                                    <th>Category</th>
                                    <th>Severe</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {this.renderPosts()}
                                </tbody>
                        </Table>
                        </>
                        
                        : "Loading!"}
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