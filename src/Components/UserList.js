import React from 'react'
import Search from './Search'
import {Link} from 'react-router-dom'
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button} from 'reactstrap';


class UserList extends React.Component {

    state = {searchValue:''}

    changeHandler = (e) => {
        this.setState({searchValue: e.target.value})
        // console.log(e.target.value)
    }
    
    searchPosts = () => {
        return this.props.posts.filter(postObj => {
            return postObj.mood_description.toLowerCase().includes(this.state.searchValue.toLowerCase()) || postObj.mood_title.toLowerCase().includes(this.state.searchValue.toLowerCase())
            })
        }

    sortByCategory = () => {
        let sortedPosts = (
            this.props.posts.sort((a,b) => {
            return (
                a.mood_category.localeCompare(b.mood_category)
                )
            })
        )
        this.setState({posts: sortedPosts})
    }

    renderList = () => {
        return (
            this.searchPosts().map(postObj => {
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
            <>
                <br/>
                {/* <Search/> */}
                <h2>Post History</h2>
                <div className="posts-container">
                <Search changeHandler={this.changeHandler} searchValue={this.state.searchValue} /><br/>
                <Button onClick={this.sortByCategory}>Sort by Category</Button>
                    <ListGroup className="posts">
                        {this.renderList()}
                    </ListGroup>   
                </div>   
            </>
        )
    }
}

export default UserList