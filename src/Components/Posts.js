import React from 'react'
import CommentContainer from '../Containers/CommentContainer'
import CommentForm from './CommentForm'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

class Post extends React.Component {

    render() {
        // console.log(this.props.postObj)
        return (
            <Router>
                <div className="container">
                    <h3>Post {this.props.postObj.id}</h3>
                        <p>Positive: {this.props.postObj.positive}</p>
                        <p>Negative: {this.props.postObj.negative}</p>
                        <p>Severe: {this.props.postObj.severe ? "Yes" : "No"}</p>
                        <p>Category: {this.props.postObj.category}</p>
                       <NavLink to={`/posts/${this.props.postObj.id}/`}>
                             <p>View Post</p>
                            {/* <p onClick={this.clickHandler}>View Post</p> */}
                        </NavLink>

                        {/* this link works upon refresh.  we need a clickhandler to set state. */}
                        {/* we also need to add a condition so this link does not appear when we are on the show page */}

                        <CommentContainer postObj={this.props.postObj}/>
                        <Route path='posts/' render={(routerProps) => {
                                                                            console.log("Loading Comments Container ",routerProps)
                                                                            return(
                                                                                <CommentContainer {...routerProps}/>
                                                                                )
                                                                        }
                                                        } />    
                </div>
            </Router>
        )
    }
}

export default Post


