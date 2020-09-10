import React from 'react'
import CommentContainer from '../Containers/CommentContainer'
import {NavLink, ListGroup, ListGroupItem, Button} from 'reactstrap'
import {Link} from 'react-router-dom'
var moment = require('moment');

class Post extends React.Component {

convertCreatedDate = () => {
    let convertedCreateDate = moment(this.props.postObj.created_at, "YYYY-MM-DD").format('MMMM Do, YYYY');
    return convertedCreateDate
}

deleteHelper = () => {
    this.props.deleteHandler(this.props.postObj)
}

createButton = () => {
    if(this.props.user.id === this.props.postObj.poster_id){
        return(
            <> 
                <br/>
                <Button id="post-edit-button" >Edit</Button>
                <br/>
            </>
        )
    }
}

render() {
    console.log(this.props)
    return(
        <div className="posts-container">
            <ListGroup className="list-group">
                <ListGroupItem>
                    <strong>{this.props.postObj.mood_title}</strong><br/>
                    <i>{this.props.postObj.mood_category === "Other" ? this.props.postObj.mood_category_detail : this.props.postObj.mood_category}</i><br/><br/>
                    <strong><p className="post-text"> {this.props.postObj.mood_description}</p></strong>
                    <NavLink tag={Link} to={`/user/${this.props.postObj.poster_id}/analytics`}><strong>{this.props.postObj.poster_name}</strong><br/><br/></NavLink>
                    <div className="post-details">
                        {`\xa0`}
                        <strong>Mood: </strong> {`${this.props.postObj.mood_rating}`}
                        {`\xa0\xa0\xa0\xa0\xa0\xa0\xa0`}
                        <strong>Trigger?: </strong> {`${this.props.postObj.mood_trigger} ${this.props.postObj.mood_trigger_detail}`}
                        {`\xa0\xa0\xa0\xa0\xa0\xa0\xa0`}
                        <strong>Location: </strong> {`${this.props.postObj.mood_location}`}
                        {`\xa0\xa0\xa0\xa0\xa0\xa0\xa0`}
                        <strong>Length: </strong> {`${this.props.postObj.mood_length}`}<br/><br/>
                        <strong>Purpose: </strong> {`${this.props.postObj.mood_purpose}`}<br/><br/>
                        <strong>Created: </strong>{this.convertCreatedDate()}
                    </div>
                </ListGroupItem>
            </ListGroup>
                {this.createButton()}
            <br/>
            <CommentContainer user={this.props.user} postObj={this.props.postObj}/> <br/>
            { this.props.user.id === this.props.postObj.poster_id ? <Button style={{backgroundColor:"#cc0000", borderColor:"black"}}  onClick={this.deleteHelper}>Delete Post</Button> : ""}
        </div>
    ) 
}
}

export default Post

