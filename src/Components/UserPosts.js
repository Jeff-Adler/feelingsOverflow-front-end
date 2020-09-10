import React from 'react'
import Search from './Search'
import {Link} from 'react-router-dom'
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button} from 'reactstrap';
import alertStar from './Images/alertStar.png'
var moment = require('moment');

class UserPosts extends React.Component {

    state = {
        posts: null,
        unsortedPosts : null,
        sorted : false
    }

    componentDidMount () {
        const token = this.props.getToken()
        this.retrievePosts(token)
    }

    retrievePosts = (token) => {
        fetch(`http://localhost:3000/users/${this.props.user.id}/posts`, {
            method: "GET",
            headers: {
                        Authorization: `Bearer ${token}`
                    }
            })  
                .then(response => response.json())
                .then(retrievedPosts => {
                    this.setState({
                        posts : [...retrievedPosts],
                        unsortedPosts : [...retrievedPosts]
                    })
                })
    }


    sortByCategory = () => {
        if (this.state.sorted === false) {
            const sortedPosts = this.state.posts.sort((a,b) => {
                return (
                    a.mood_category.localeCompare(b.mood_category)
                    )
            })
            this.setState({
                posts:[...sortedPosts],
                sorted:true
            })
        } else {
            const unsortedPosts = this.state.unsortedPosts 
            this.setState({
                posts:[...unsortedPosts],
                sorted:false
            })
        }
    }

    changeHandler = (e) => {
        this.setState({searchValue: e.target.value})
    }

    convertCreatedDate = (postObj) => {
        let convertedCreateDate = moment(postObj.created_at, "YYYY-MM-DD").format('MMMM Do, YYYY');
        return convertedCreateDate
    }
    
    searchPosts = () => {
        return this.posts.filter(postObj => {
            return postObj.mood_description.toLowerCase().includes(this.state.searchValue.toLowerCase()) || postObj.mood_title.toLowerCase().includes(this.state.searchValue.toLowerCase())
            })
        }

    renderList = () => {
        return (
            this.searchPosts().map(postObj => {
                return (
                    <ListGroupItem key={postObj.id}>
                        <ListGroupItemHeading tag={Link} to={`/posts/${postObj.id}/`}>{postObj.mood_title}</ListGroupItemHeading>{`\xa0`}            
                        {postObj.mood_purpose === "Get Support" ? <img className="alert-star" src={alertStar} alt="needs support"/> : ""} 
                        <ListGroupItemText>
                            <i>{postObj.mood_category === "Other" ? postObj.mood_category_detail : postObj.mood_category}</i><br/>
                            <strong>{postObj.poster_name}</strong>
                            {`\xa0\xa0\xa0\xa0\xa0\xa0\xa0`}
                            {this.convertCreatedDate(postObj)}
                        </ListGroupItemText>
                    </ListGroupItem>
                )
            })
        ) 
    }

    render() {
        return (
            <>
                <h3>{this.props.user.username}'s Posts</h3><br/>
                <Search changeHandler={this.changeHandler} searchValue={this.state.searchValue} /> {`\xa0`}
                <Button onClick={this.sortByCategory}>Sort by Category</Button>
                <div className="posts-container">
                    <ListGroup className="posts">
                        {this.renderList()}
                    </ListGroup>   
                </div>   
            </>
        )
    }
}

export default UserPosts