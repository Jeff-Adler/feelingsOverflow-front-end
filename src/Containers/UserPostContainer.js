import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import NotFound from "../Components/Errors/404";
import UserPosts from "../Components/UserPosts";
import Post from "../Components/Post";
import EditPostForm from "../Components/EditPostForm";

class UserPostContainer extends React.Component {
  state = {
    posts: null,
    unsortedPosts: null,
    sorted: false,
  };

  componentDidMount() {
    const token = this.props.getToken();
    if (token) {
      this.retrievePosts(token);
    }
  }

  retrievePosts = (token) => {
    fetch(
      `https://feelings-overflow-app-api.herokuapp.com/api/v1/users/${this.props.user.id}/posts`,
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

  deleteHandler = (postObj) => {
    let id = postObj.id;

    const token = this.props.getToken();
    const configObj = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch(
      `https://feelings-overflow-app-api.herokuapp.com/posts/${id}`,
      configObj
    )
      .then((response) => response.json())
      .then((retrievedPosts) => {
        this.setState({
          posts: [...retrievedPosts],
          unsortedPosts: [...retrievedPosts],
        });
        this.props.history.push(`/users/${this.props.user.id}/posts`);
      });
  };

  editHandler = (postObj) => {
    let id = postObj.id;
    console.log("editHandler", postObj);

    const token = this.props.getToken();
    const configObj = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(postObj),
    };

    fetch(
      `https://feelings-overflow-app-api.herokuapp.com/posts/${id}`,
      configObj
    )
      .then((response) => response.json())
      .then((retrievedPosts) => {
        this.setState({
          posts: [...retrievedPosts],
          unsortedPosts: [...retrievedPosts],
        });
        this.props.history.push(`/users/${this.props.user.id}/posts/${id}`);
      });
  };

  render() {
    return (
      <>
        {this.state.posts !== null ? (
          <>
            <Switch>
              <Route
                exact
                path={`/users/${this.props.user.id}/posts/:id/edit`}
                render={({ match }) => {
                  let id = parseInt(match.params.id);
                  let foundPost = this.state.posts.find(
                    (post) => post.id === id
                  );
                  return foundPost ? (
                    <EditPostForm
                      postObj={foundPost}
                      user={this.props.user}
                      editHandler={this.editHandler}
                    />
                  ) : (
                    <h3>Not Found</h3>
                  );
                }}
              />
              <Route
                exact
                path={`/users/${this.props.user.id}/posts/:postId`}
                render={({ match }) => {
                  let id = parseInt(match.params.postId);
                  let foundPost = this.state.posts.find(
                    (post) => post.id === id
                  );
                  return foundPost ? (
                    <Post
                      currentUser={this.props.currentUser}
                      user={this.props.user}
                      deleteHandler={this.deleteHandler}
                      getToken={this.props.getToken}
                      postObj={foundPost}
                    />
                  ) : (
                    <h3>Not Found</h3>
                  );
                }}
              />
              <Route
                exact
                path={`/users/${this.props.user.id}/posts`}
                render={() => {
                  return (
                    <UserPosts
                      user={this.props.user}
                      sortByCategory={this.sortByCategory}
                      posts={this.state.posts}
                    />
                  );
                }}
              />
              <Route component={NotFound} />
            </Switch>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default withRouter(UserPostContainer);
