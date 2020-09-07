import React from 'react';
import './App.css';
import { Route, withRouter, Switch} from 'react-router-dom';
import Navbar from './Components/Navbar';
import PostContainer from './Containers/PostContainer'
import Signup from './Components/Signup'
import Login from './Components/Login'
import UserContainer from './Containers/UserContainer'

class App extends React.Component {

  constructor (props) {
    super (props)

    this.state = {
      user:false,
      isUserLoaded: false,
      authenticationError: "",
      authenticating: false
    }
  }

  getToken = () => {
    return localStorage.getItem("token")
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
    const token = this.getToken()
    if (token) {
      this.retrieveUserProfile(token)
      } else {
        //redirects to login page if user isn't authenticated
        this.props.history.push("/login") 
        this.setState({isUserLoaded:true})
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

  render () {
    return (
      (this.state.isUserLoaded ?
        <div className="App">
          {this.state.user ? <Navbar user={this.state.user} clickHandler={this.logOutHandler}/> : null}
          <Switch>
            <Route path="/login" render={() => <Login authenticating={this.state.authenticating} submitHandler={this.loginHandler} authenticationError={this.state.authenticationError} user={this.state.user} clickHandler={this.logOutHandler}/>} />
            <Route path="/signup" render={() => <Signup submitHandler={this.signupHandler} user={this.state.user} clickHandler={this.logOutHandler}/>} />
            <Route path='/user' render={(routerProps) => <UserContainer {...routerProps} user={this.state.user} getToken={this.getToken}/>}/>
            <Route path='/' render={(routerProps) => <PostContainer {...routerProps} user={this.state.user} getToken={this.getToken} />}/>
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
