import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../Components/Errors/404";
import User from "../Components/User";
import UserPostContainer from "./UserPostContainer";
import UserStats from "../Components/UserStats";

class UserContainer extends React.Component {
  state = {
    users: null,
  };

  componentDidMount() {
    if (this.props.currentUser.id) {
      const token = this.props.getToken();
      this.retrieveUsers(token);
    }
  }

  retrieveUsers = (token) => {
    fetch(`https://feelings-overflow-app-api.herokuapp.com/api/v1/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((users) => {
        this.setState({ users: users });
      });
  };

  render() {
    return (
      <>
        {this.state.users === null ? (
          ""
        ) : (
          <>
            <br />
            <br />
            <Switch>
              <Route
                path="/users/:id/posts"
                render={({ match }) => {
                  let id = parseInt(match.params.id);
                  let foundUser = this.state.users.find(
                    (user) => user.id === id
                  );
                  return foundUser ? (
                    <UserPostContainer
                      getToken={this.props.getToken}
                      currentUser={this.props.currentUser}
                      user={foundUser}
                    />
                  ) : (
                    <h3>Not Found</h3>
                  );
                }}
              />
              <Route
                exact
                path="/users/:id/stats"
                render={({ match }) => {
                  let id = parseInt(match.params.id);
                  let foundUser = this.state.users.find(
                    (user) => user.id === id
                  );
                  return foundUser ? (
                    <UserStats
                      getToken={this.props.getToken}
                      user={foundUser}
                    />
                  ) : (
                    <h3>Not Found</h3>
                  );
                }}
              />
              {/* User Profile Page */}
              <Route
                exact
                path="/users/:id"
                render={({ match }) => {
                  let id = parseInt(match.params.id);
                  let foundUser = this.state.users.find(
                    (user) => user.id === id
                  );
                  return foundUser ? (
                    <User
                      currentUser={this.props.currentUser}
                      user={foundUser}
                    />
                  ) : (
                    <h3>Not Found</h3>
                  );
                }}
              />
              <Route component={NotFound} />
            </Switch>
          </>
        )}
      </>
    );
  }
}

export default UserContainer;
