import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './Components/Navbar';
import PostContainer from './Containers/PostContainer'
import Signup from './Components/Signup'
import Login from './Components/Login'

class App extends React.Component {

  constructor () {
    super ()

    this.state = {
      user:false
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
        // this.props.history.push("/login") Need to fix this.props.history to get this to work
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
        this.setState({user : data.user}, () => console.log("logged in", this.state.user)) //may want to use this.props.history.push to redirect

        })
  }

  logOutHandler = () => {
    localStorage.removeItem("token")
    // this.props.history.push("/login") Need to fix this.props.history to get this to work
    this.setState({user:null})
  }

  render () {
    return (
      <Router>
        <div className="App">
          <Navbar user={this.state.user} clickHandler={this.logOutHandler}/>
          <h1>Pillow Talk.</h1>
          <Route exact path="/login" render={() => <Login submitHandler={this.loginHandler}/>} />
          <Route exact path="/signup" render={() => <Signup submitHandler={this.signupHandler}/>} />
          <PostContainer user={this.state.user}/>
        </div>
      </Router>
    )
  }
}

export default App;
