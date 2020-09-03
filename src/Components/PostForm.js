import React from 'react'

class PostForm extends React.Component {
    state= {
        positive: "",
        negative:"",
        severe: null,
        category: ""
    }

submitHelper = (e) => {
    e.preventDefault()
    console.log(this.state)
    return this.props.submitHandler(this.state)
}

severeChangeHelper = (e) => {
    this.setState({
        severe: e.target.value
    })
}

thoughtsChangeHelper =(e) => {
    console.log(e.target.value)
    this.setState({
        [e.target.name]: e.target.value
    })
}

categoryChangeHelper =(e) => {
    console.log(e.target.value)
    this.setState({
        category: e.target.value
    })
}

    render() {
        return(
                <>
                <h2>Create a Post</h2>
                <form onSubmit = {this.submitHelper}>
                    <label>Positive Thought</label>
                    <br/>
                    <textarea onChange={this.thoughtsChangeHelper} value={this.state.positive} type="text" name="positive" placeholder="enter positive thought here"></textarea>
                    <br/><br/>

                    <label>Negative Thought</label>
                    <br/>
                    <textarea onChange={this.thoughtsChangeHelper} value={this.state.negative} type="text" name="negative" placeholder="enter negative thought here"></textarea>
                    <br/><br/>

                    <label>Severe
                        <input 
                            type="radio" 
                            value="Yes" 
                            name="severe"
                            checked={this.state.severe === "Yes"}
                            onChange={this.severeChangeHelper}/>
                            Yes
                        <input 
                            type="radio" 
                            value="No" 
                            name="severe"
                            checked={this.state.severe === "No"}
                            onChange={this.severeChangeHelper}/>
                            No
                        </label> 
                    <br/><br/>

                    <label>Category</label>
                    <br/>
                    <select value={this.state.category} onChange={this.categoryChangeHelper} name="category">
                        <option value={null}>Choose category</option>
                        <option value="family">Family</option>
                        <option value="relationships">Relationships</option>
                        <option value="work">Work</option>
                        <option value="health">Health</option>
                        <option value="other">Other</option>
                    </select>
                    <br/><br/>

                    <input type="submit" value="submit"/>
                </form>
                </>
        )
    }
}


export default PostForm