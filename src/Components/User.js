import React from 'react';
import { NavLink, ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap';
import { Link } from 'react-router-dom'
import {Route, Switch } from 'react-router-dom'
import UserPosts from './UserPosts'
import UserStats from './UserStats'
import UserEditForm from './UserEditForm'
import NotFound from '../Components/Errors/404'
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
                <Switch>
                    <Route path={`/users/${this.props.user.id}/posts`} render={() => {
                        return <UserPosts currentUser={this.props.currentUser} getToken={this.props.getToken} user={this.props.user}/> }}
                    />
                    <Route exact path={`/users/${this.props.user.id}/stats`} render={() => {
                        return <UserStats getToken={this.props.getToken} user={this.props.user}/> }}
                    />
                    <Route exact path={`/users/${this.props.user.id}/edit`} render={() => {
                        return <UserEditForm editHandler={this.props.editHandler} getToken={this.props.getToken} currentUser={this.props.currentUser} user={this.props.user}/> }}
                    />
                    <Route component={NotFound} />
                </Switch>
            </>
        )
    }
}


export default User