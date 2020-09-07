import React from 'react'
import { Table } from 'reactstrap';
import Search from '../Components/Search'

class UserList extends React.Component {

    showPost = (event) => {
        this.props.history.push(`/user/posts/${event.target.id}/`)
    }

    renderList = () => {
        return (
            this.props.posts.map(postObj => {
                return (
                    <tr key={postObj.id}  id={postObj.id} onClick={event => this.showPost(event)}>
                        <th id={postObj.id} scope="row">{postObj.id}</th>
                            <td id={postObj.id}>{postObj.id}</td>
                            <td id={postObj.id}>{postObj.category}</td>
                            <td id={postObj.id}>{postObj.severe ? "Yes" : "No"}</td>
                            <td id={postObj.id}>{postObj.created_at}</td>
                    </tr>
                )
            })
        ) 
    }

    render() {
        return (
            <>
                <Search />
                <Table striped>
                    <thead>
                        <tr>
                            <th>Post id</th>
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

export default UserList