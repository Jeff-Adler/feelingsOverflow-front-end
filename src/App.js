import React from 'react';
import './App.css';
import { Route, withRouter, Switch} from 'react-router-dom';
import Navbar from './Components/Navbar';
import PostContainer from './Containers/PostContainer'
import Signup from './Components/Signup'
import Login from './Components/Login'
import PostForm from './Components/PostForm'
// import CommentContainer from './Containers/CommentContainer'
// import CommentForm from './Components/CommentForm'
import UserContainer from './Containers/UserContainer'

class App extends React.Component {

  constructor (props) {
    super (props)

    this.state = {
      user:false,
      posts: [], 
      isUserLoaded: false,
      isPostsLoaded: false,
      authenticationError: "",
      authenticating: false
    }
  }

  //retrieves all posts from backend
  retrievePosts = (token) => {
    fetch("http://localhost:3000/posts", {
      method: "GET",
      headers: {
                  Authorization: `Bearer ${token}`
               }
      })
        .then(response => response.json())
        .then(posts => {
          this.setState({posts : posts,
                        isPostsLoaded:true})
        })
  }

  //sends current_user token to load user's profile from backend
  retrieveUserProfile = (token) => {
    fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: {
                    Authorization: `Bearer ${token}`
                 }
        })
          .then(response => response.json())
          .then(data => {
            this.setState({user : data.user,
                          isUserLoaded:true})
          })
  }

  componentDidMount () {
    //retrieves token associated with current_user on frontend
    const token = localStorage.getItem("token")
    if (token) {
      this.retrieveUserProfile(token)
      this.retrievePosts(token)
      } else {
        //redirects to login page if user isn't authenticated
        this.props.history.push("/login") 
        this.setState({isUserLoaded:true,
                        isPostsLoaded:true})
      }
  }

  signupHandler = (userObj) => {

    const configObj = {
      method: "POST",
      headers: {
        "accepts" : "application/json",
        "content-type" : "application/json"
      },
      body: JSON.stringify({user: userObj})
    }

    fetch("http://localhost:3000/api/v1/users", configObj)
      .then(response => response.json())
      .then(data => this.setState({user : data.user},
                                  () => {this.loginHandler(this.state.user)}))
  }

  loginHandler = (userInfo) => {
    this.setState({authenticating: true})
    const configObj = {
      method: "POST",
      headers: {
        "accepts" : "application/json",
        "content-type" : "application/json"
      },
      body: JSON.stringify({user: userInfo})
    }

    fetch("http://localhost:3000/api/v1/login", configObj)
      .then(response => response.json())
      .then(data => 
          {if (data.jwt) {
            localStorage.setItem("token",data.jwt)
            this.setState({user:data.user,
                          authenticating: false}, 
                          () => {this.props.history.push("/")
                                window.location.reload()
                          }) 
                      } else {
                        this.setState({authenticationError: data.message,
                                      authenticating:false})
                      }
          })
  }

  logOutHandler = () => {
    localStorage.removeItem("token")
    this.props.history.push("/login") 
    this.setState({user:false})
  }

  submitHandler =(newPostObj) => {
    newPostObj = {...newPostObj,
                  poster_name : this.state.user.username}
    const token = localStorage.getItem("token")
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
                      }, () => {this.props.history.push(`/posts/${post.id}`)})
      })
  }


  render () {
    return (
      (this.state.isUserLoaded && this.state.isPostsLoaded ?
        <div className="App">
          {this.state.user ? <Navbar user={this.state.user} clickHandler={this.logOutHandler}/> : null}
          <Switch>
            <Route path="/login" render={() => <Login authenticating={this.state.authenticating} submitHandler={this.loginHandler} authenticationError={this.state.authenticationError} user={this.state.user} clickHandler={this.logOutHandler}/>} />
            <Route path="/signup" render={() => <Signup submitHandler={this.signupHandler} user={this.state.user} clickHandler={this.logOutHandler}/>} />
            <Route path='/posts/new' render={() => <PostForm submitHandler={this.submitHandler} /> }/>
            <Route path='/profile' render={() => <UserContainer user={this.state.user}/>}/>
            <Route path='/' render={() => <PostContainer user={this.state.user} posts={this.state.posts} />}/>
          </Switch>
        </div>
      :
        <div className="center">
          <h1>Loading</h1>
        </div>
      )
    )
  }
}

export default withRouter(App);
