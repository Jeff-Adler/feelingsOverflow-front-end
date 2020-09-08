import React from 'react';
import { Input } from 'reactstrap';

class Search extends React.Component {
    render () {
        return(
            <form>
            <Input type="text" placeholder="search by title or description" value={this.props.searchValue} onChange={this.props.changeHandler} />
        </form>
        )
    }
}

export default Search
