import React from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

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
    let severe = false
    if (e.target.value === "Yes") {
        severe = true
    }
    this.setState({
        severe: severe
    },() => console.log(this.state.severe))
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
                <div className="formCenter" >
                <Form onSubmit = {this.submitHelper} style={{ width: "400px" }}>

                    <FormGroup>
                        <Label>Positive Thought</Label>
                        <br/>
                        <textarea type="textarea" onChange={this.thoughtsChangeHelper} value={this.state.positive}name="positive" placeholder="enter positive thought here"/>
                    </FormGroup>
                    <br/><br/>

                    <FormGroup>
                        <Label>Negative Thought</Label>
                        <br/>
                        <textarea type="textarea" onChange={this.thoughtsChangeHelper} value={this.state.negative} name="negative" placeholder="enter negative thought here"/>
                    </FormGroup>
                    <br/><br/>

                    <FormGroup tag="fieldset">
                        <legend>Severe?</legend>
                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="Yes"
                                name="severe"
                                checked={this.state.severe === true}
                                onChange={e => this.severeChangeHelper(e)}/>
                                Yes
                        </Label>
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="No"
                                name="severe"
                                checked={this.state.severe === false}
                                onChange={e => this.severeChangeHelper(e)}/>
                                No
                        </Label> 
                    </FormGroup>
                    </FormGroup>
                    <br/><br/>

                    <Label>Category</Label>
                    <br/>
                    <Input type="select" value={this.state.category} onChange={this.categoryChangeHelper} name="category">
                        <option value={null}>Choose category</option>
                        <option value="family">Family</option>
                        <option value="relationships">Relationships</option>
                        <option value="work">Work</option>
                        <option value="health">Health</option>
                        <option value="other">Other</option>
                    </Input>
                    <br/><br/>

                    <Button>Submit</Button>
                </Form>
                </div>
                </>
        )
    }
}


export default PostForm


// <>
//                 <h2>Create a Post</h2>
//                 <form onSubmit = {this.submitHelper}>
//                     <label>Positive Thought</label>
//                     <br/>
//                     <textarea onChange={this.thoughtsChangeHelper} value={this.state.positive} type="text" name="positive" placeholder="enter positive thought here"></textarea>
//                     <br/><br/>

//                     <label>Negative Thought</label>
//                     <br/>
//                     <textarea onChange={this.thoughtsChangeHelper} value={this.state.negative} type="text" name="negative" placeholder="enter negative thought here"></textarea>
//                     <br/><br/>

//                     <label>Severe
//                         <input 
//                             type="radio" 
//                             value="Yes"
//                             name="severe"
//                             checked={this.state.severe === true}
//                             onChange={e => this.severeChangeHelper(e)}/>
//                             Yes
//                         <input 
//                             type="radio" 
//                             value="No"
//                             name="severe"
//                             checked={this.state.severe === false}
//                             onChange={e => this.severeChangeHelper(e)}/>
//                             No
//                         </label> 
//                     <br/><br/>

//                     <label>Category</label>
//                     <br/>
//                     <select value={this.state.category} onChange={this.categoryChangeHelper} name="category">
//                         <option value={null}>Choose category</option>
//                         <option value="family">Family</option>
//                         <option value="relationships">Relationships</option>
//                         <option value="work">Work</option>
//                         <option value="health">Health</option>
//                         <option value="other">Other</option>
//                     </select>
//                     <br/><br/>

//                     <input type="submit" value="submit"/>
//                 </form>
//                 </>