import React from 'react'
import CommentContainer from '../Containers/CommentContainer'
import { NavLink } from 'react-router-dom'

function Post (props){
    console.log(props.postObj)
    return (
        <div className="container">
            {/* <h3>Post Title</h3> */}
                <p>Positive: {props.postObj.positive}</p>
                <p>Negative: {props.postObj.negative}</p>
                <p>Severe: {props.postObj.severe ? "Yes" : "No"}</p>
                <p>Category: {props.postObj.category}</p>
                <NavLink id="create-comment" to="/createcomment">
                     <li>Add Comment</li>
                </NavLink>
                {/* <p><CommentContainer /></p> */}
        </div>
    )
}

export default Post


