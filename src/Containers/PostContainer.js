import React from 'react';
import Posts from '../Components/Posts'

class PostContainer extends React.Component {

renderPosts = () => {
    return this.props.posts.map(postObj => <Posts key={postObj.id} postObj={postObj}/>)
}

    render () {
        console.log(this.props)
        return (
            <>
            <div className="PostContainer">
                {this.props.user ?
                "User validated!" :
                "User not validated!"}
            </div>
                <>
                 {this.renderPosts()}
                </>
            </>
        )
    }
}

export default PostContainer