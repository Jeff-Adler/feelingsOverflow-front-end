import React from 'react'
import CommentContainer from '../Containers/CommentContainer'
import { Route, Switch, withRouter} from 'react-router-dom'
import { Table } from 'reactstrap';

class Post extends React.Component {

    render() {
        console.log(this.props.postObj)
        return (
            <>
                <Switch>
                    <Route path="/posts/:id" render={() => {
                        return(
                            <>
                                <Table hover>
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
                                                    <td>{this.props.postObj.created_at.toString().substring(0,10)}</td>
                                            </tr>
                                    </tbody>
                                </Table>
                                <h3> Title: {this.props.postObj.mood_title}</h3>
                                <p> {this.props.postObj.mood_description}</p>
                                <p>I want to: {this.props.postObj.mood_purpose}</p>
                                <p>Category: {this.props.postObj.mood_category} {this.props.postObj.mood_category_detail}</p>
                                <p>How did you rate your mood? {this.props.postObj.mood_rating}</p>
                                <p>How long were you feeling this way? {this.props.postObj.mood_length}</p>
                                <p>Where were you when you were feeling this way? {this.props.postObj.mood_location}</p>
                                <p>Do you know what made you feel this way, and if so, what was it? {this.props.postObj.mood_trigger} {this.props.postObj.mood_trigger_detail}</p>

                                <CommentContainer postObj={this.props.postObj}/>
                            </>
                            )
                        }} />            
                </Switch>
            </>
        )
    }
}

export default withRouter(Post)

