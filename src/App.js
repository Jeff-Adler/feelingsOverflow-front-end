import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, withRouter, Switch} from 'react-router-dom';
import Navbar from './Components/Navbar';
import PostContainer from './Containers/PostContainer'
import Signup from './Components/Signup'
import Login from './Components/Login'
import PostForm from './Components/PostForm'
// import CommentContainer from './Containers/CommentContainer'
// import CommentForm from './Components/CommentForm'
import UserContainer from './Containers/UserContainer'




class App extends React.Component {

  constructor () {
    super ()

    this.state = {
      user:false,
      posts: [] 
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
          this.setState({posts:posts})
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
          .then(data => {this.setState({user : data.user})})
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
      .then(data => this.setState({user : data.user})) 
  }

  loginHandler = (userInfo) => {
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
        {   
        localStorage.setItem("token",data.jwt)
        this.setState(
            {user : data.user}, 
            () => {this.props.history.push("/")}
          ) 
        })
  }

  logOutHandler = () => {
    localStorage.removeItem("token")
    this.props.history.push("/login") 
    this.setState({user:null})
  }

  submitHandler =(newPostObj) => {
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
        console.log(post)
        this.setState({
          posts: [post,...this.state.posts]
        })
      })
  }


  render () {
    return (
      <Router>
        <div className="App">
          {this.state.user ? <Navbar user={this.state.user} clickHandler={this.logOutHandler}/> : null}
          <Switch>
            <Route path="/login" render={() => <Login submitHandler={this.loginHandler} user={this.state.user} clickHandler={this.logOutHandler}/>} />
            <Route path="/signup" render={() => <Signup submitHandler={this.signupHandler} user={this.state.user} clickHandler={this.logOutHandler}/>} />
            <Route path='/posts' render={() => <PostContainer user={this.state.user} posts={this.state.posts} />}/>
            <Route path='/createpost' render={() => <PostForm submitHandler={this.submitHandler} /> }/>
            {/* <Route path='/comments' render={()=> <CommentContainer name={this.state.posts}/>} /> 
            <Route path='/createcomment' render={() => <CommentForm submitHandler={this.commentSubmitHandler} /> }/> */}
            <Route path='/profile' render={() => <UserContainer user={this.state.user}/>}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default withRouter(App);
