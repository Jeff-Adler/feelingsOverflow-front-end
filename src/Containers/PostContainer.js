import React from 'react';
import Posts from '../Components/Posts'
import { Route, Switch, withRouter } from 'react-router-dom'

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
                console.log("found post", foundPost)
                // debugger
                return <Posts postObj={foundPost} />

            }} />
                {/* if route does not have a condition, render all posts */}
            <Route path="/posts" render={() => {
                return(
                    <>
                        {this.renderPosts()}
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