import React from "react";
import { ListGroup, ListGroupItem, ListGroupItemText } from "reactstrap";
var moment = require("moment");

class UserStats extends React.Component {
  state = {
    analytics: null,
  };

  componentDidMount() {
    const token = this.props.getToken();
    fetch(
      `https://feelings-overflow-app-api.herokuapp.com/api/v1//users/${this.props.user.id}/analytics`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((analyticData) => {
        this.setState({ analytics: analyticData });
      });
  }

  convertJoinDateToDate = () => {
    let convertedJoinDate = moment(
      Object.values(this.state.analytics[0])[0],
      "YYYY-MM-DD"
    ).format("MMMM Do, YYYY");
    return convertedJoinDate;
  };

  render() {
    return (
      <>
        {this.state.analytics !== null ? (
          <>
            <h3>{this.props.user.username}'s Stats</h3>
            <div className="center">
              <ListGroup id="user-form">
                <ListGroupItem>
                  <ListGroupItemText>
                    <strong>Joined: </strong> {this.convertJoinDateToDate()}
                  </ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                  <ListGroupItemText>
                    <strong>Total Comments: </strong>{" "}
                    {Object.values(this.state.analytics[1])[0]}
                  </ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                  <ListGroupItemText>
                    <strong>Total Upvotes: </strong>{" "}
                    {Object.values(this.state.analytics[2])[0]}
                  </ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                  <ListGroupItemText>
                    <strong>Total Downvotes: </strong>{" "}
                    {Object.values(this.state.analytics[3])[0]}
                  </ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                  <ListGroupItemText>
                    <strong>Most Popular Comment: </strong>{" "}
                    {Object.values(this.state.analytics[4])[0] !== null
                      ? Object.values(this.state.analytics[4])[0].id
                      : ""}
                  </ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                  <ListGroupItemText>
                    <strong>Most Commented Post: </strong>{" "}
                    {Object.values(this.state.analytics[5])[0] !== null
                      ? Object.values(this.state.analytics[5])[0].id
                      : ""}
                  </ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </div>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default UserStats;
