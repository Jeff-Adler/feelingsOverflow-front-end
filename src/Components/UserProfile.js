import React from 'react';
import { NavLink, ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap';
import { Link } from 'react-router-dom'
var moment = require('moment');

class UserProfile extends React.Component {

    convertBirthdateToDate = () => {
        let convertBirthdate = moment(this.props.userObj.birthdate, "YYYY-MM-DD").format('MMMM Do, YYYY');
        return convertBirthdate
    }

    render() {
        return (
            <>
            <h3>User Profile</h3>
             <div className="center">
                <ListGroup id="user-form">

                <ListGroupItem>
                    <ListGroupItemText><strong>Username:</strong> {this.props.userObj.username} </ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                    <ListGroupItemText><strong>Birthdate:</strong> {this.convertBirthdateToDate()} </ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                    <ListGroupItemText><strong>Gender:</strong> {this.props.userObj.gender} </ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                    <ListGroupItemText><strong>Location:</strong> {this.props.userObj.location} </ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                    <ListGroupItemText><NavLink tag={Link} to="/user/posts">View My Posts</NavLink></ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                    <ListGroupItemText><NavLink tag={Link} to="/user/edit">Edit My Info</NavLink></ListGroupItemText>
                </ListGroupItem>

            </ListGroup>
            </div>
        </>
        )
    }
}


export default UserProfile