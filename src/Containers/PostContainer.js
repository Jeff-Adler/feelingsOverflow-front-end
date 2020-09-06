import React from 'react';
import Posts from '../Components/Posts'
import { Route, Switch, withRouter, Link } from 'react-router-dom'
import Search from '../Components/Search'
import { Table, NavLink } from 'reactstrap';

class PostContainer extends React.Component {

renderPosts = () => {
    return this.props.posts.map(postObj => <Posts key={postObj.id} postObj={postObj}/>)
}

    render () {
        return (
            <>

        {/* if posts have not yet rendered, add a loading note */}
        {this.props.posts.length === 0 ? <h1> LOADING</h1> :


        // if posts have rendered, redirect as below
        <Switch>
                {/* if route has a condition, render as follows.   */}
            
            <Route path="/posts/:id" render={({match})=> {
                let id = parseInt(match.params.id)
                let foundPost = this.props.posts.find((post) => post.id ===id)
                return <Posts postObj={foundPost} />

            }} />
                {/* if route does not have a condition, render all posts */}
            <Route path="/" render={() => {
                return(
                    <>

                <NavLink tag={Link} to="/createpost" className="left">create new post</NavLink>

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
                                    {this.renderPosts()}
                                </tbody>
                        </Table>
                    </>
                     )
            }} />
        </Switch>
          }
            </>        
        )
    }
}

export default withRouter(PostContainer)