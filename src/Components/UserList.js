import React from 'react'
import {Link} from 'react-router-dom'
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';


class UserList extends React.Component {

    renderList = () => {
        return (
            this.props.posts.map(postObj => {
                return (
                    <ListGroupItem key={postObj.id}>
                        <ListGroupItemHeading tag={Link} to={`/posts/${postObj.id}/`}>{postObj.mood_title}</ListGroupItemHeading>
                        <ListGroupItemText>
                            {` 
                                ${postObj.mood_purpose}
                                \xa0\xa0\xa0\xa0\xa0\xa0\xa0
                                ${postObj.mood_rating}  
                                \xa0\xa0\xa0\xa0\xa0\xa0\xa0 
                                ${postObj.mood_category}    
                                \xa0\xa0\xa0\xa0\xa0\xa0\xa0 
                                ${postObj.created_at.toString().substring(0,10)}
                            `}
                        </ListGroupItemText>
                    </ListGroupItem>
                )
            })
        ) 
    }

    render() {
        return (
            <div className="posts-container">
                <ListGroup className="posts">
                    {this.renderList()}
                </ListGroup>   
            </div>   
        )
    }
}

export default UserList