import React from 'react'
import {Link} from 'react-router-dom'
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button} from 'reactstrap';
import Search from './Search'
import ModalForm from './ModalForm'

class PostList extends React.Component {
    
state = {
    searchValue:''
}

    changeHandler = (e) => {
        this.setState({searchValue: e.target.value})
    }
    
    searchPosts = () => {
        return this.props.posts.filter(postObj => {
            return postObj.mood_description.toLowerCase().includes(this.state.searchValue.toLowerCase()) || postObj.mood_title.toLowerCase().includes(this.state.searchValue.toLowerCase())
            })
        }
    
    renderList = () => {
        return (this.searchPosts().map(postObj => {
            return (
                    <ListGroupItem key={postObj.id}>
                        <ListGroupItemHeading tag={Link} to={`/posts/${postObj.id}/`}>{postObj.mood_title}</ListGroupItemHeading>
                        <ListGroupItemText>
                            <strong>{postObj.poster_name}</strong>
                            {` 
                                \xa0\xa0\xa0\xa0\xa0\xa0\xa0 
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
            )})
        )
    }

    render () {
        return(
        <>
            <br/><br/>
            <ModalForm submitHandler={this.props.submitHandler} parentComponent="postList" buttonLabel="What's on your mind?"/><br/><br/>
            <Search changeHandler={this.changeHandler} searchValue={this.state.searchValue} /> {`\xa0`}
            <Button onClick={this.props.sortByCategory}>Sort by Category</Button>
            <div className="posts-container">
                <ListGroup className="posts">
                    {this.renderList()}
                </ListGroup>   
            </div>  
        </>       
        )
    }

}

export default PostList