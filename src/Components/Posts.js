import React from 'react'
import CommentContainer from '../Containers/CommentContainer'
import { Route, Switch, NavLink, withRouter, Link } from 'react-router-dom'

class Post extends React.Component {

    // showPost = () => {
    //     this.props.history.push(`/posts/${this.props.postObj.id}/`)
    // }

    render() {
        return (
            <>
                <Switch>
                    <Route path="/posts/:id" render={() => {
                        return(
                            <>
                                <div className="container">
                                    <h3>Post {this.props.postObj.id}</h3>
                                        <p>Positive: {this.props.postObj.positive}</p>
                                        <p>Negative: {this.props.postObj.negative}</p>
                                        <p>Severe: {this.props.postObj.severe ? "Yes" : "No"}</p>
                                        <p>Category: {this.props.postObj.category}</p><br/>
                                        <CommentContainer postObj={this.props.postObj}/>
                                </div>
                            </>
                            )
                        }} />
                    <Route path="/posts" render={() => {
                        return(
                            <>
                                <div className="container">
                                    <h3>Post {this.props.postObj.id} Name</h3>
                                        <p>Positive: {this.props.postObj.positive}</p>
                                        <p>Negative: {this.props.postObj.negative}</p>
                                        <p>Severe: {this.props.postObj.severe ? "Yes" : "No"}</p>
                                        <p>Category: {this.props.postObj.category}</p><br/>
                                            <NavLink tag={Link} to={`/posts/${this.props.postObj.id}/`}>
                                                <p>View Post</p>
                                            </NavLink>
                                        {/* <p onClick={this.showPost}>SHOW POST</p> */}
                                </div>
                            </>
                            )
                        }} />
                    <Route path="/profile" render={() => {
                    return(
                            <>
                                <div className="container">
                                    <h3>Post {this.props.postObj.id} Name</h3>
                                        <p>Positive: {this.props.postObj.positive}</p>
                                        <p>Negative: {this.props.postObj.negative}</p>
                                        <p>Severe: {this.props.postObj.severe ? "Yes" : "No"}</p>
                                        <p>Category: {this.props.postObj.category}</p><br/>
                                        <NavLink tag={Link} to={`/posts/${this.props.postObj.id}/`}>
                                                <p>View Post</p>
                                            </NavLink>
                                        {/* <p onClick={this.showPost}>SHOW POST</p> */}
                                </div>
                            </>
                        )
                    }} />
                </Switch>
            </>
        )
    }
}

export default withRouter(Post)


