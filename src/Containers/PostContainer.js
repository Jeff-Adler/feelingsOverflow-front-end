import React from 'react';
import Post from '../Components/Post'
import { Route, Switch, withRouter} from 'react-router-dom'
import PostForm from '../Components/PostForm'
import PostList from '../Components/PostList'

class PostContainer extends React.Component {

state = {
    posts : null
}

componentDidMount () {
    if (this.props.user.id) {
        this.retrievePosts()
    }
}

//retrieves all posts from backend
retrievePosts = () => {
    const token = this.props.getToken()
    fetch("http://localhost:3000/posts", {
        method: "GET",
        headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        .then(response => response.json())
        .then(posts => {
            this.setState({
                posts : posts
            })
        })
  }

submitHandler = (newPostObj) => {
    newPostObj = {
        ...newPostObj,
        poster_name : this.props.user.username
    }
    const token = this.props.getToken()
    const configObj = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "accepts" : "application/json",
        "content-type" : "application/json"
      },
      body: JSON.stringify({post : newPostObj})
    }

    fetch("http://localhost:3000/posts", configObj)
      .then(response => response.json())
      .then(post => {
        this.setState({
          posts: [post,...this.state.posts]
                      }, 
            () => {this.props.history.push(`/posts/${post.id}`)})
      })
}

render () {
    return (
        <>
            {this.state.posts === null 
            ? 
                <h1> LOADING</h1> 
            :
                <Switch> 
                    <Route path="/posts/new" render={() => <PostForm submitHandler={this.submitHandler} />} />      
                    <Route exact path="/posts/:id" render={({match})=> {
                        let id = parseInt(match.params.id)
                        let foundPost = this.state.posts.find((post) => post.id ===id)
                        return <Post postObj={foundPost} user={this.props.user}/>
                    }} />
                    <Route path={this.props.match.url} render={() => <PostList posts={this.state.posts}/>} />
                </Switch>
                }
        </>        
    )
}
}

export default withRouter(PostContainer)