import React from 'react'
import CommentContainer from '../Containers/CommentContainer'
import {NavLink, ListGroup, ListGroupItem} from 'reactstrap'
import {Link} from 'react-router-dom'

class Post extends React.Component {

render() {
    return(
        <div className="posts-container">
            <ListGroup className="list-group">
                <ListGroupItem>
                    <strong>{this.props.postObj.mood_title}</strong><br/><br/>
                    <p className="post-text"> {this.props.postObj.mood_description}</p>
                    <NavLink tag={Link} to={`/user/${this.props.postObj.poster_id}/analytics`}><strong>{this.props.postObj.poster_name}</strong><br/><br/></NavLink>
                            {` 
                                \xa0\xa0\xa0\xa0\xa0\xa0\xa0 
                                Trigger: ${this.props.postObj.mood_trigger} ${this.props.postObj.mood_trigger_detail}
                                \xa0\xa0\xa0\xa0\xa0\xa0\xa0 
                                Location: ${this.props.postObj.mood_location}
                                \xa0\xa0\xa0\xa0\xa0\xa0\xa0 
                                Purpose: ${this.props.postObj.mood_purpose}
                                \xa0\xa0\xa0\xa0\xa0\xa0\xa0 
                                Length: ${this.props.postObj.mood_length}
                                \xa0\xa0\xa0\xa0\xa0\xa0\xa0    
                                Rating: ${this.props.postObj.mood_rating}  
                                \xa0\xa0\xa0\xa0\xa0\xa0\xa0 
                                Category: ${this.props.postObj.mood_category} ${this.props.postObj.mood_category_detail}  
                                \xa0\xa0\xa0\xa0\xa0\xa0\xa0 
                                ${this.props.postObj.created_at.toString().substring(0,10)}
                            `}
                </ListGroupItem>
            </ListGroup>
            <br/>
            <CommentContainer user={this.props.user} postObj={this.props.postObj}/>
        </div>
    ) 
}
}

export default Post

