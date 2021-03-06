import React from 'react';
import { NavLink, ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap';
import { Link } from 'react-router-dom'
var moment = require('moment');

class User extends React.Component {

    convertBirthdateToDate = () => {
        let convertBirthdate = moment(this.props.user.birthdate, "YYYY-MM-DD").format('MMMM Do, YYYY');
        return convertBirthdate
    }

    render() {
        return (
            <>
                <h3>{this.props.user.username}'s Profile</h3>
                <div className="center">
                    <ListGroup id="user-form">

                        <ListGroupItem>
                            <ListGroupItemText><strong>Username:</strong> {this.props.user.username} </ListGroupItemText>
                        </ListGroupItem>

                        <ListGroupItem>
                            <ListGroupItemText><strong>Birthdate:</strong> {this.convertBirthdateToDate()} </ListGroupItemText>
                        </ListGroupItem>

                        <ListGroupItem>
                            <ListGroupItemText><strong>Gender:</strong> {this.props.user.gender} </ListGroupItemText>
                        </ListGroupItem>

                        <ListGroupItem>
                            <ListGroupItemText><strong>Location:</strong> {this.props.user.location} </ListGroupItemText>
                        </ListGroupItem>

                        <ListGroupItem>
                            <ListGroupItemText><NavLink tag={Link} to={`/users/${this.props.user.id}/posts`}>View Posts</NavLink></ListGroupItemText>
                        </ListGroupItem>

                        <ListGroupItem>
                            <ListGroupItemText><NavLink tag={Link} to={`/users/${this.props.user.id}/stats`}>View Stats</NavLink></ListGroupItemText>
                        </ListGroupItem>

                        { 
                            this.props.currentUser.id === this.props.user.id 
                        ?
                            <ListGroupItem>
                                <ListGroupItemText><NavLink tag={Link} to={`/users/${this.props.user.id}/edit`}>Edit Info</NavLink></ListGroupItemText>
                            </ListGroupItem>
                        :
                            ""
                        }

                    </ListGroup>
                </div>
            </>
        )
    }
}


export default User