import React from 'react';
import Posts from '../Components/Posts'

class PostContainer extends React.Component {

renderPosts = () => {
    return this.props.posts.map(postObj => <Posts key={postObj.id} postObj={postObj}/>)
}

    render () {
        return (
            <>
            <div className="PostContainer">
                {this.props.user ?
                "User validated!" :
                "User not validated!"}
            </div>
                <>
                <h2>Post List</h2>
                 {this.renderPosts()}
                </>
            </>
        )
    }
}

export default PostContainer