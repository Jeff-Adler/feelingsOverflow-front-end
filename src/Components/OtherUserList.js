import React from 'react'
import Search from './Search'
import {Link} from 'react-router-dom'
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button} from 'reactstrap';

class OtherUserList extends React.Component {

    state = {
        searchValue:'',
        posts:null
    }

    componentDidMount () {
        console.log(this.props.user.id)
        const token = this.props.getToken()
        // fetch(`http://localhost:3000/users/${this.props.user.id}/posts`, {
        // method: "GET",
        // headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        // })
        //     .then(response => response.json())
        //     .then(posts => { console.log(posts)
        //     this.setState({posts:posts})
        //     })
    }

    searchPosts = () => {
        return this.state.posts.filter(postObj => {
            return postObj.mood_description.toLowerCase().includes(this.state.searchValue.toLowerCase()) || postObj.mood_title.toLowerCase().includes(this.state.searchValue.toLowerCase())
            })
        }

    //don't think this is active
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
                {this.state.posts !== null 
                ?
                    <>
                        <h3>{this.props.user.username}'s Posts</h3><br/>
                        <Search changeHandler={this.changeHandler} searchValue={this.state.searchValue} /> {`\xa0`}
                        <Button onClick={this.props.sortByCategory}>Sort by Category</Button>
                        <div className="posts-container">
                            <ListGroup className="posts">
                                {this.renderList()}
                            </ListGroup>   
                        </div>  
                    </>
                :
                    <h3>"User has no posts!"</h3>
                } 
            </>
        )
    }

}

export default OtherUserList