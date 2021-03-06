import React from 'react';
import { Input } from 'reactstrap';

class Search extends React.Component {
    render () {
        return(
            <div id="search" style={{ width: "500px" }}>
                <form id="searchForm">
                    <Input type="text" placeholder="search by title or description" value={this.props.searchValue} onChange={this.props.changeHandler} />
                </form>
            </div>
        )
    }
}

export default Search
