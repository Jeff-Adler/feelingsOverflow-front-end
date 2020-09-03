import React from 'react'

function Post (props){
    console.log(props.postObj)
    return (
        <div>
            <h3>Post Title</h3>
                <p>Positive: {props.postObj.positive}</p>
                <p>Negative: {props.postObj.negative}</p>
                <p>Severe: {props.postObj.severe ? "Yes" : "No"}</p>
                <p>Category: {props.postObj.category}</p>
                <p>Leave Comment</p>
        </div>
    )
}

export default Post