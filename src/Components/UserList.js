import React from 'react'
import {Link} from 'react-router-dom'
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';


class UserList extends React.Component {

    renderList = () => {
        return (
            this.props.posts.map(postObj => {
                return (
                    <ListGroupItem key={postObj.id}>
                        <ListGroupItemHeading tag={Link} to={`/posts/${postObj.id}/`}>{postObj.positive}</ListGroupItemHeading>
                        <ListGroupItemText>
                            {` 
                                \xa0\xa0\xa0\xa0\xa0\xa0\xa0    
                                ${postObj.severe ? "Severe" : "Not severe"}  
                                \xa0\xa0\xa0\xa0\xa0\xa0\xa0 
                                ${postObj.category}    
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