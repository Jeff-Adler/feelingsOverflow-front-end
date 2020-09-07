import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Table, NavLink } from 'reactstrap';
import Search from '../Components/Search'

class PostList extends React.Component {

    showPost = (event) => {
        console.log(event.target)
        this.props.history.push(`/posts/${event.target.id}/`)
    }

    renderList = () => {
        return ( this.props.posts.map(postObj => {
            return (
                <tr key={postObj.id} id={postObj.id} onClick={event => this.showPost(event)}>
                    <th id={postObj.id} scope="row">{postObj.poster_name}</th>
                        <td id={postObj.id}>{postObj.id}</td>
                        <td id={postObj.id}>{postObj.category}</td>
                        <td id={postObj.id}>{postObj.severe ? "Yes" : "No"}</td>
                        <td id={postObj.id}>{postObj.created_at}</td>
                </tr>
            )})
        )
    }

    render () {
        return(
            <>
                <NavLink tag={Link} to="/posts/new" className="center">What's on your mind?</NavLink>
                <Search />
                <Table striped>
                    <thead>
                        <tr>
                            <th>Poster Name</th>
                            <th>Post Description</th>
                            <th>Category</th>
                            <th>Severe</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                </Table>
            </>
                )
    }
}

export default withRouter(PostList)