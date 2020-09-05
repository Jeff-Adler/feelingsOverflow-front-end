import React from 'react';
import Posts from '../Components/Posts'
import {Route, Switch} from 'react-router-dom'
import { Table } from 'reactstrap';
import Search from '../Components/Search'

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
                                {this.state.isLoaded ? 
                    <>
                    <Search />
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Poster Name</th>
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