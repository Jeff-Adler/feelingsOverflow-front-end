import React from 'react'
import { Link} from 'react-router-dom'
import { Table, NavLink } from 'reactstrap';
import Search from '../Components/Search'

class PostList extends React.Component {

    renderList = () => {
        return ( this.props.posts.map(postObj => {
            return (
                <>
                    <tr key={`1-${postObj.id}`} id={postObj.id}>
                        <th key={`2-${postObj.id}`} id={postObj.id} scope="row">{postObj.poster_name}</th>
                            <td key={`3-${postObj.id}`} id={postObj.id}>{postObj.id}</td>
                            <td key={`4-${postObj.id}`} id={postObj.id}>{postObj.category}</td>
                            <td key={`5-${postObj.id}`} id={postObj.id}>{postObj.severe ? "Yes" : "No"}</td>
                            <td key={`6-${postObj.id}`} id={postObj.id}>{postObj.created_at}</td>
                    </tr>
                    <NavLink key={postObj.id * 100} tag={Link} to={`/posts/${postObj.id}/`}>View Post</NavLink>
                </>
            )})
        )
    }

    render () {
        return(
            <>
                <br/><br/>
                <NavLink tag={Link} to="/posts/new" >What's on your mind?</NavLink>
                <Search />
                <Table striped>
                    <thead>
                        <tr key="0">
                            <th key="1">Poster Name</th>
                            <th key="2">Post Description</th>
                            <th key="3">Category</th>
                            <th key="4">Severe</th>
                            <th key="5">Created At</th>
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

export default PostList