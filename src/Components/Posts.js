import React from 'react'
import CommentContainer from '../Containers/CommentContainer'
import { Route, Switch, NavLink, withRouter, Link } from 'react-router-dom'
import { Table } from 'reactstrap';

class Post extends React.Component {

    showPost = () => {
        this.props.history.push(`/posts/${this.props.postObj.id}/`)
    }

    render() {
        return (
            <>
                <Switch>
                    <Route path="/posts/:id" render={() => {
                        return(
                            <>
                            <Table striped>
                            <thead>
                                <tr>
                                    <th>Poster Name</th>
                                    <th>Post Description</th>
                                    <th>Category</th>
                                    <th>Severe</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                                <tbody>
                                <tr onClick={this.showPost}>
                                            <th scope="row">{this.props.postObj.poster_id}</th>
                                                <td>{this.props.postObj.id}</td>
                                                <td>{this.props.postObj.category}</td>
                                                <td>{this.props.postObj.severe ? "Yes" : "No"}</td>
                                                <td>{this.props.postObj.created_at}</td>
                                        </tr>
                                </tbody>
                            </Table>
                            <p>Positive thought: {this.props.postObj.positive}</p>
                            <p>Negative thought: {this.props.postObj.negative}</p>
                            
                            <CommentContainer postObj={this.props.postObj}/>

                            </>
                            )
                        }} />
                    <Route path="/posts" render={() => {
                        return(
                            <>
                                        <tr onClick={this.showPost}>
                                            <th scope="row">{this.props.postObj.poster_id}</th>
                                                <td>{this.props.postObj.id}</td>
                                                <td>{this.props.postObj.category}</td>
                                                <td>{this.props.postObj.severe ? "Yes" : "No"}</td>
                                                <td>{this.props.postObj.created_at}</td>
                                        </tr>

                            </>
                            )
                        }} />
                    <Route path="/profile" render={() => {
                    return(
                            <>
                                        <tr onClick={this.showPost}>
                                            <th scope="row">{this.props.postObj.poster_id}</th>
                                                <td>{this.props.postObj.id}</td>
                                                <td>{this.props.postObj.category}</td>
                                                <td>{this.props.postObj.severe ? "Yes" : "No"}</td>
                                                <td>{this.props.postObj.created_at}</td>
                                        </tr>
                            </>
                        )
                    }} />
                </Switch>
            </>
        )
    }
}

export default withRouter(Post)



{/* <div className="container">
<h3>Post {this.props.postObj.id} Name</h3>
    <p>Positive: {this.props.postObj.positive}</p>
    <p>Negative: {this.props.postObj.negative}</p>
    <p>Severe: {this.props.postObj.severe ? "Yes" : "No"}</p>
    <p>Category: {this.props.postObj.category}</p><br/>
        <NavLink tag={Link} to={`/posts/${this.props.postObj.id}/`}>
            <p>View Post</p>
        </NavLink> */}
    {/* <p onClick={this.showPost}>SHOW POST</p> */}
{/* </div> */}