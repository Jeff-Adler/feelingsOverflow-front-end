import React from 'react'
import { Link} from 'react-router-dom'
import { Table, NavLink  } from 'reactstrap';
import Search from '../Components/Search'

class UserList extends React.Component {

    renderList = () => {
        return (
            this.props.posts.map(postObj => {
                return (
                    <>
                        <tr key={postObj.id}>
                            <th scope="row">{postObj.id}</th>
                                <td>{postObj.id}</td>
                                <td>{postObj.category}</td>
                                <td>{postObj.severe ? "Yes" : "No"}</td>
                                <td>{postObj.created_at}</td>
                        </tr>
                        <NavLink tag={Link} to={`/posts/${postObj.id}/`}>View Post</NavLink>
                    </>
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