import React from "react";
import Comment from "../Components/Comment";
import { ListGroup, ListGroupItem } from "reactstrap";
import ModalForm from "../Components/ModalForm";

class CommentContainer extends React.Component {
  state = {
    comments: null,
    sortedComments: null,
    votedComments: null,
    isLoaded: false,
    loadedVotedComments: false,
  };

  componentDidMount() {
    // This is antipattern that should be refactored
    this.mounted = true;
    const token = localStorage.getItem("token");
    if (token) {
      this.retrieveComments(token);
      this.retrievePastVotes(token);
    }
  }

  retrieveComments = (token) => {
    fetch(
      `https://feelings-overflow-app-api.herokuapp.com/posts/${this.props.postObj.id}/comments`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((comments) => {
        if (this.mounted) {
          this.setState(
            {
              comments: [...comments],
              sortedComments: [...comments],
              isLoaded: true,
            },
            () => this.sortComments()
          );
        }
      });
  };

  retrievePastVotes = (token) => {
    if (token) {
      fetch(
        `https://feelings-overflow-app-api.herokuapp.com/api/v1/users/${this.props.currentUser.id}/voted_comments`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((votedComments) => {
          if (this.mounted) {
            this.setState({
              votedComments: votedComments,
              loadedVotedComments: true,
            });
          }
        });
    }
  };

  postComment = (formData) => {
    const commentObj = {
      comment: {
        ...formData,
        post_id: this.props.postObj.id,
      },
    };

    const token = localStorage.getItem("token");
    fetch("https://feelings-overflow-app-api.herokuapp.com/comments/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(commentObj),
    })
      .then((response) => response.json())
      .then((comment) => {
        comment.vote_tally = 0;
        this.setState({ comments: [comment, ...this.state.comments] }, () =>
          this.sortComments()
        );
      });
  };

  voteHandler = (voteType, comment) => {
    let upvote = true;
    if (voteType === "downvote") {
      upvote = false;
    }

    const voteObj = {
      upvote: upvote,
    };

    const token = localStorage.getItem("token");
    const configObj = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ vote: voteObj }),
    };

    fetch(
      `https://feelings-overflow-app-api.herokuapp.com/comments/${comment.id}/votes/create`,
      configObj
    )
      .then((resp) => resp.json())
      .then((commentObj) => {
        const commentIndex = this.state.comments.findIndex(
          (searchedComment) => {
            return searchedComment.id === comment.id;
          }
        );
        //This will throw a warning to not mutate directly, but setState is used in following line
        this.state.comments[commentIndex] = commentObj;
        this.setState(
          {
            comments: this.state.comments,
            votedComments: [...this.state.votedComments, comment],
          },
          () => this.sortComments()
        );
      });
  };

  sortComments = () => {
    const sortedComments = this.state.comments.sort((a, b) => {
      return b.vote_tally - a.vote_tally;
    });
    this.setState({ sortedComments: sortedComments });
  };

  renderComments = () => {
    return this.state.sortedComments.map((comment) => {
      return (
        <ListGroupItem key={comment.id}>
          <Comment
            votedComments={this.state.votedComments}
            comment={comment}
            voteHandler={this.voteHandler}
          />
        </ListGroupItem>
      );
    });
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <>
        {this.state.isLoaded && this.state.loadedVotedComments ? (
          <>
            <ModalForm
              postComment={this.postComment}
              parentComponent={"commentContainer"}
              buttonLabel="Leave a comment?"
            />
            <br />
            <ListGroup className="list-group">
              {this.renderComments()}
            </ListGroup>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default CommentContainer;
