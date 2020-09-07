import React from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

class NewPostForm extends React.Component {
    state= {
        moodRating: null,
        moodLength: null,
        moodLocation: null,
        moodTrigger: null,
        moodTriggerDetail: "",
        moodDescription: "",
        moodPurpose: null,
        moodTitle: "",
        moodCategory: null
    }

submitHelper = (e) => {
    e.preventDefault()
    return this.props.submitHandler(this.state)
}


changeHelper =(e) => {
    console.log(e.target.name, e.target.value)
    this.setState({
        [e.target.name]: e.target.value
    })
}

render() {
    return(
            <>
                <br/><br/>
                <div className="formCenter" >
                <Form onSubmit = {this.submitHelper} style={{ width: "600px" }}>

                    {/* Mood rating begin */}
                    <FormGroup tag="fieldset">
                        <legend>How are you feeling today?</legend>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="Awesome!"
                                name="moodRating"
                                checked={this.state.moodRating === "Awesome!"}
                                onChange={this.changeHelper}/>
                                Awesome!
                        </Label>
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="Pretty good"
                                name="moodRating"
                                checked={this.state.moodRating === "Pretty good"}
                                onChange={this.changeHelper}/>
                                Pretty good
                        </Label> 
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="Doing okay"
                                name="moodRating"
                                checked={this.state.moodRating === "Doing okay"}
                                onChange={this.changeHelper}/>
                                Doing okay
                        </Label> 
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="A little down"
                                name="moodRating"
                                checked={this.state.moodRating === "A little down"}
                                onChange={this.changeHelper}/>
                                A little down
                        </Label> 
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="Eh, could be better"
                                name="moodRating"
                                checked={this.state.moodRating === "Eh, could be better"}
                                onChange={this.changeHelper}/>
                                Eh, could be better
                        </Label> 
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="Really having a hard time"
                                name="moodRating"
                                checked={this.state.moodRating === "Really having a hard time"}
                                onChange={this.changeHelper}/>
                                Really having a hard time
                        </Label> 
                    </FormGroup>
                    
                    </FormGroup>
                    <br/><br/>


                    {/* Mood length begin */}
                    <FormGroup tag="fieldset">
                        <legend>How long have you been feeling this way?</legend>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="Just today"
                                name="moodLength"
                                checked={this.state.moodLength === "Just today"}
                                onChange={this.changeHelper}/>
                                Just today
                        </Label>
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="The past few days"
                                name="moodLength"
                                checked={this.state.moodLength === "The past few days"}
                                onChange={this.changeHelper}/>
                                The past few days
                        </Label> 
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="The past few weeks"
                                name="moodLength"
                                checked={this.state.moodLength === "The past few weeks"}
                                onChange={this.changeHelper}/>
                                The past few weeks
                        </Label> 
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="1-6 months"
                                name="moodLength"
                                checked={this.state.moodLength === "1-6 months"}
                                onChange={this.changeHelper}/>
                                1-6 months
                        </Label> 
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="6-12 months"
                                name="moodLength"
                                checked={this.state.moodLength === "6-12 months"}
                                onChange={this.changeHelper}/>
                                6-12 months
                        </Label> 
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="Over a year"
                                name="moodLength"
                                checked={this.state.moodLength === "Over a year"}
                                onChange={this.changeHelper}/>
                                Over a year
                        </Label> 
                    </FormGroup>
                    
                    </FormGroup>
                    <br/><br/>


                    <FormGroup>
                        <Label for="moodLocation">Where are you when you are feeling this way?</Label>
                        <Input onChange={this.changeHelper} type="text" name="moodLocation" value={this.state.moodLocation} />
                    </FormGroup>
                    <br/><br/>

                    <FormGroup tag="fieldset">
                        <legend>Do you know what may trigger this feeling?</legend>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="Yes"
                                name="moodTrigger"
                                checked={this.state.moodTrigger === "Yes"}
                                onChange={this.changeHelper}/>
                                Yes
                        </Label>
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="No"
                                name="moodTrigger"
                                checked={this.state.moodTrigger === "No"}
                                onChange={this.changeHelper}/>
                                No
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <Label for="moodLocation">If yes, what is it?</Label>
                        <Input onChange={this.changeHelper} 
                        type="text" 
                        name="moodTriggerDetail" 
                        value={this.state.moodTrigger === "Yes" ? this.state.moodTriggerDetail : ""}
                        disabled={this.state.moodTrigger === "Yes" ? '' : 'disabled'} />
                    </FormGroup>

                    </FormGroup>
                    <br/><br/>

                    <FormGroup>
                        <Label for="moodDescription">Okay, thanks for that info.  Now, describe the feeling as best as you can:</Label>
                        <textarea style={{ width: "600px", height: "600px" }} onChange={this.changeHelper} 
                        type="text" 
                        name="moodDescription" 
                        value={this.state.moodDescription} />
                    </FormGroup>

                    <br/><br/>


                    <FormGroup tag="fieldset">
                        <legend>Do you want to use this post to:</legend>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="Inspire others"
                                name="moodPurpose"
                                checked={this.state.moodPurpose === "Inspire others"}
                                onChange={this.changeHelper}/>
                                Inspire others
                        </Label>
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="Get some support"
                                name="moodPurpose"
                                checked={this.state.moodPurpose === "Get some support"}
                                onChange={this.changeHelper}/>
                                Get some support
                        </Label>
                    </FormGroup>

                    </FormGroup>
                    <br/><br/>

                    <FormGroup>
                        <Label for="moodTitle">Great, thanks for sharing!  What would you like to call this post?</Label>
                        <Input 
                            onChange={this.changeHelper} 
                            type="text" 
                            name="moodTitle" 
                            value={this.state.moodTitle} />
                    </FormGroup>
                    <br/><br/>




                    <FormGroup tag="fieldset">
                        <legend>And how should we categorize this post?</legend>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="Family"
                                name="moodCategory"
                                checked={this.state.moodCategory === "Family"}
                                onChange={this.changeHelper}/>
                                Family
                        </Label>
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="Work"
                                name="moodCategory"
                                checked={this.state.moodCategory === "Work"}
                                onChange={this.changeHelper}/>
                                Work
                        </Label>
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="School"
                                name="moodCategory"
                                checked={this.state.moodCategory === "School"}
                                onChange={this.changeHelper}/>
                                School
                        </Label>
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="Friends"
                                name="moodCategory"
                                checked={this.state.moodCategory === "Friends"}
                                onChange={this.changeHelper}/>
                                Friends
                        </Label>
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="Relationships"
                                name="moodCategory"
                                checked={this.state.moodCategory === "Relationships"}
                                onChange={this.changeHelper}/>
                                Relationships
                        </Label>
                    </FormGroup>

                    <FormGroup check>
                        <Label check>
                            <Input 
                                type="radio" 
                                value="Other"
                                name="moodCategory"
                                checked={this.state.moodCategory === "Other"}
                                onChange={this.changeHelper}/>
                                Other
                        </Label>
                    </FormGroup>

                    </FormGroup>
                    <br/>

                    <Button>Submit</Button>
                </Form>
                </div>
            </>
    )
}
}


export default NewPostForm
