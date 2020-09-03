import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, withRouter, Switch} from 'react-router-dom';
// import { Switch } from 'react-router-dom'
import Navbar from './Components/Navbar';
import PostContainer from './Containers/PostContainer'
import Signup from './Components/Signup'
import Login from './Components/Login'

class App extends React.Component {

  constructor () {
    super ()

    this.state = {
      user:false,
      posts: [
        {id: 1, positive: "good thing that happened today", negative: "bad thing that happened today", severe: false, category: "misc", user_id: 1},
        {id: 2, positive: "another good thing that happened today", negative: "another bad thing that happened today", severe: true, category: "family", user_id: 1}
      ] //remove after real API added
    }
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
          </Switch>
        </div>
      </Router>
    )
  }
}

export default withRouter(App);
