import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../Components/Errors/404";
import UserEditForm from "../Components/UserEditForm";
import User from "../Components/User";
import UserPostContainer from "./UserPostContainer";
import UserStats from "../Components/UserStats";

class MyContainer extends React.Component {
  state = {
    posts: null,
    unsortedPosts: null,
  };

  componentDidMount() {
    if (this.props.currentUser.id) {
      const token = this.props.getToken();
      this.retrieveMyPosts(token);
    }
  }

  retrieveMyPosts = (token) => {
    fetch(
      `https://feelings-overflow-app-api.herokuapp.com/api/v1/users/${this.props.currentUser.id}/posts`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((retrievedPosts) => {
        this.setState({
          posts: [...retrievedPosts],
          unsortedPosts: [...retrievedPosts],
        });
      });
  };

  sortByCategory = () => {
    if (this.state.sorted === false) {
      const sortedPosts = this.state.posts.sort((a, b) => {
        return a.mood_category.localeCompare(b.mood_category);
      });
      this.setState({
        posts: [...sortedPosts],
        sorted: true,
      });
    } else {
      const unsortedPosts = this.state.unsortedPosts;
      this.setState({
        posts: [...unsortedPosts],
        sorted: false,
      });
    }
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
                path={`/users/${this.props.currentUser.id}/posts`}
                render={() => {
                  return (
                    <UserPostContainer
                      getToken={this.props.getToken}
                      currentUser={this.props.currentUser}
                      user={this.props.user}
                    />
                  );
                }}
              />
              <Route
                exact
                path={`/users/${this.props.currentUser.id}/edit`}
                render={() => {
                  return (
                    <UserEditForm
                      editHandler={this.props.editHandler}
                      getToken={this.props.getToken}
                      currentUser={this.props.currentUser}
                      user={this.props.user}
                    />
                  );
                }}
              />
              <Route
                exact
                path={`/users/${this.props.currentUser.id}/stats`}
                render={() => {
                  return (
                    <UserStats
                      getToken={this.props.getToken}
                      user={this.props.user}
                    />
                  );
                }}
              />
              <Route
                exact
                path={`/users/${this.props.currentUser.id}`}
                render={() => {
                  return (
                    <User
                      currentUser={this.props.currentUser}
                      user={this.props.user}
                    />
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

export default MyContainer;
