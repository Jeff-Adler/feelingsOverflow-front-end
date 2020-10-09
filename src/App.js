import React from "react";
import "./App.css";
import { Route, withRouter, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar";
import PostContainer from "./Containers/PostContainer";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import UserContainer from "./Containers/UserContainer";
import NotFound from "./Components/Errors/404";
import MyContainer from "./Containers/MyContainer";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false,
      isUserLoaded: false,
      signupError: null,
      authenticationError: "",
      authenticating: false,
    };
  }

  getToken = () => {
    return localStorage.getItem("token");
  };

  //sends current_user token to load user's profile from backend
  retrieveUserProfile = (token) => {
    fetch("https://feelings-overflow-app-api.herokuapp.com/api/v1/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.setState({ user: data.user, isUserLoaded: true });
        }
      });
  };

  componentDidMount() {
    //retrieves token associated with current_user on frontend
    const token = this.getToken();
    if (token) {
      this.retrieveUserProfile(token);
    } else {
      //redirects to login page if user isn't authenticated
      this.props.history.push("/login");
      this.setState({ isUserLoaded: true });
    }
  }

  signupHandler = (userObj) => {
    const configObj = {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: userObj }),
    };

    fetch(
      "https://feelings-overflow-app-api.herokuapp.com/api/v1/users",
      configObj
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.jwt) {
          this.setState(
            {
              user: data.user,
            },
            () => {
              this.loginHandler(this.state.user);
            }
          );
        } else {
          this.setState({ signupError: data });
        }
      });
  };

  loginHandler = (userInfo) => {
    this.setState({ authenticating: true });
    const configObj = {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: userInfo }),
    };

    fetch(
      "https://feelings-overflow-app-api.herokuapp.com/api/v1/login",
      configObj
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("token", data.jwt);
          this.setState({ user: data.user, authenticating: false }, () => {
            this.props.history.push("/");
          });
        } else {
          this.setState({
            authenticationError: data.message,
            authenticating: false,
          });
        }
      });
  };

  updateUser = (userData) => {
    this.setState({ user: userData });
  };

  //Sends user info patch requests
  editHandler = (userObj) => {
    let newUser = {
      birthdate: userObj.birthdate,
      gender: userObj.gender,
      location: userObj.location,
    };

    const token = this.getToken();

    const configObj = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user: newUser }),
    };

    fetch(
      `https://feelings-overflow-app-api.herokuapp.com/api/v1/users/${this.state.user.id}`,
      configObj
    )
      .then((response) => response.json())
      .then((data) => {
        this.updateUser(data.user);
        this.props.history.push(`/users/${this.state.user.id}`);
      });
  };

  logOutHandler = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
    this.setState({ user: false });
  };

  render() {
    return this.state.isUserLoaded ? (
      <div className="App">
        {this.state.user ? (
          <Navbar
            navbarClickHandler={this.navbarClickHandler}
            currentUser={this.state.user}
            clickHandler={this.logOutHandler}
          />
        ) : null}
        <Switch>
          <Route
            exact
            path="/login"
            render={() => (
              <Login
                authenticating={this.state.authenticating}
                submitHandler={this.loginHandler}
                authenticationError={this.state.authenticationError}
                user={this.state.user}
                clickHandler={this.logOutHandler}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <Signup
                submitHandler={this.signupHandler}
                user={this.state.user}
                clickHandler={this.logOutHandler}
                signupError={this.state.signupError}
              />
            )}
          />
          {/* This route is necessary at this level of the hierarchy to allow for instant access to MyPosts from anywhere on the app */}
          {this.state.user ? (
            <Route
              path={`/users/${this.state.user.id}`}
              render={() => (
                <MyContainer
                  editHandler={this.editHandler}
                  user={this.state.user}
                  currentUser={this.state.user}
                  getToken={this.getToken}
                />
              )}
            />
          ) : (
            ""
          )}
          <Route
            path="/users"
            render={(routerProps) => (
              <UserContainer
                {...routerProps}
                updateUser={this.updateUser}
                currentUser={this.state.user}
                getToken={this.getToken}
              />
            )}
          />
          <Route
            path="/posts"
            render={(routerProps) => (
              <PostContainer
                {...routerProps}
                user={this.state.user}
                getToken={this.getToken}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={(routerProps) => (
              <PostContainer
                {...routerProps}
                deleteHandler={this.deleteHandler}
                user={this.state.user}
                getToken={this.getToken}
              />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    ) : (
      ""
    );
  }
}

export default withRouter(App);
