import React from 'react'
import CommentContainer from '../Containers/CommentContainer'
import { Route, Switch, withRouter} from 'react-router-dom'
import { Table } from 'reactstrap';

class Post extends React.Component {

    render() {
        return (
            <>
                <Switch>
                    <Route path="/posts/:id" render={() => {
                        return(
                            <>
                            {this.props.user.id}
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
                            <p>Positive thought: {this.props.postObj.positive}</p>
                            <p>Negative thought: {this.props.postObj.negative}</p>
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

