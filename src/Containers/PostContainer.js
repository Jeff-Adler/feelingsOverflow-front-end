import React from 'react';

class PostContainer extends React.Component {

    render () {
        return (
            <div className="PostContainer">
                {this.props.user ?
                "User validated!" :
                "User not validated!"}
            </div>
        )
    }
}

export default PostContainer