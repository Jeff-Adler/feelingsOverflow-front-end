import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import PostList from "../Components/PostList";
import NotFound from "../Components/Errors/404";

class PostContainer extends React.Component {
  state = {
    posts: null,
    unsortedPosts: null,
    sorted: false,
  };

  componentDidMount() {
    if (this.props.user.id) {
      this.retrievePosts();
    }
  }

  //retrieves all posts from backend
  retrievePosts = () => {
    const token = this.props.getToken();
    fetch("https://feelings-overflow-app-api.herokuapp.com/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((retrievedPosts) => {
        this.setState({
          posts: [...retrievedPosts],
          unsortedPosts: [...retrievedPosts],
        });
      });
  };

  submitHandler = (newPostObj) => {
    console.log(newPostObj);

    newPostObj = {
      ...newPostObj,
      poster_name: this.props.user.username,
    };
    const token = this.props.getToken();
    const configObj = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ post: newPostObj }),
    };

    fetch("https://feelings-overflow-app-api.herokuapp.com/posts", configObj)
      .then((response) => response.json())
      .then((post) => {
        this.setState(
          {
            posts: [post, ...this.state.posts],
          },
          () => {
            this.props.history.push(
              `/users/${this.props.user.id}/posts/${post.id}`
            );
          }
        );
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
        {this.state.posts === null ? (
          ""
        ) : (
          <Switch>
            <Route
              exact
              path="/posts"
              render={() => (
                <PostList
                  sortByCategory={this.sortByCategory}
                  submitHandler={this.submitHandler}
                  posts={this.state.posts}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <PostList
                  sortByCategory={this.sortByCategory}
                  submitHandler={this.submitHandler}
                  posts={this.state.posts}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        )}
      </>
    );
  }
}

export default withRouter(PostContainer);
