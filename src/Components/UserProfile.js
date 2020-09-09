import React from 'react';
import { NavLink, ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap';
import { Link } from 'react-router-dom'



class UserProfile extends React.Component {

    render() {
        console.log(this.props.userObj)
        var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
        return (
            <>
            <h3>User Profile</h3>
             <div className="center">
                <ListGroup id="user-form">

                <ListGroupItem>
                    <ListGroupItemText>Username: {this.props.userObj.username} </ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                    <ListGroupItemText>Age: {yyyy - this.props.userObj.age} </ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                    <ListGroupItemText>Gender: {this.props.userObj.gender} </ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                    <ListGroupItemText>Location: {this.props.userObj.location} </ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                    <ListGroupItemText><NavLink tag={Link} to="/user/posts">View My Posts</NavLink></ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                    <ListGroupItemText><NavLink tag={Link} to="/user/edit">Edit my profile</NavLink></ListGroupItemText>
                </ListGroupItem>

            </ListGroup>
            </div>
        </>
        )
    }
}


export default UserProfile