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
      .then(console.log()) //fill-in with setState
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
      .then(console.log()) //need to setState and redirect to relevant page
  }

  render () {
    return (
      <Router>
        <div className="App">
          <Navbar />
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
