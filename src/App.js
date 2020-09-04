import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, withRouter, Switch} from 'react-router-dom';
import Navbar from './Components/Navbar';
import PostContainer from './Containers/PostContainer'
import Signup from './Components/Signup'
import Login from './Components/Login'
import PostForm from './Components/PostForm'
import CommentContainer from './Containers/CommentContainer'
import CommentForm from './Components/CommentForm'


class App extends React.Component {

  constructor () {
    super ()

    this.state = {
      user:false,
      posts: [] 
    }
  }

  retrievePosts = (token) => {
    fetch("http://localhost:3000/posts", {
      method: "GET",
      headers: {
                  Authorization: `Bearer ${token}`
               }
      })
        .then(response => response.json())
        .then(posts => {
          console.log(posts)
          this.setState({posts:posts})
        })
  }

  componentDidMount () {
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: {
                    Authorization: `Bearer ${token}`
                 }
        })
          .then(response => response.json())
          .then(data => {
                          console.log("in CDM?", data)
                          this.setState({user : data.user})
                        }
              )

      this.retrievePosts(token)
      } else {
        this.props.history.push("/login") 
      }
  }

  signupHandler = (userObj) => {

    console.log(JSON.stringify({user: userObj}))

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
      .then(data => this.setState({user : data.user}, () => console.log(this.state.user))) 
  }

  loginHandler = (userInfo) => {
    console.log("logging in",userInfo)

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

        console.log("Token: ", data.jwt)
        localStorage.setItem("token",data.jwt)
        this.setState({user : data.user}, 
          () => console.log("logged in", this.state.user)) //use this.props.history.push to redirect after login

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
          <Navbar user={this.state.user} clickHandler={this.logOutHandler}/>
          <h1>Pillow Talk.</h1>
          <Switch>
            <Route exact path="/login" render={() => <Login submitHandler={this.loginHandler}/>} />
            <Route exact path="/signup" render={() => <Signup submitHandler={this.signupHandler}/>} />
            <Route path='/posts' render={() => <PostContainer user={this.state.user} posts={this.state.posts} />}/>
            <Route path='/createpost' render={() => <PostForm submitHandler={this.submitHandler} /> }/>
            <Route path="/comments" render={()=> <CommentContainer name={this.state.posts}/>} /> 
            <Route path='/createcomment' render={() => <CommentForm submitHandler={this.commentSubmitHandler} /> }/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default withRouter(App);
