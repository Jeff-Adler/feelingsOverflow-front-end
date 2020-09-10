import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

class EditPostForm extends React.Component {

    state= {
        mood_rating: this.props.postObj.mood_rating || "",
        mood_length: this.props.postObj.mood_length || "",
        mood_location: this.props.postObj.mood_location || "",
        mood_trigger: this.props.postObj.mood_trigger || "",
        mood_trigger_detail: this.props.postObj.mood_trigger_detail || "",
        mood_description: this.props.postObj.mood_description || "",
        mood_purpose: this.props.postObj.mood_purpose || "",
        mood_title: this.props.postObj.mood_title || "",
        mood_category: this.props.postObj.mood_category || "",
        mood_category_detail: this.props.postObj.mood_category_detail || "",
        id: this.props.postObj.id,
        poster_name: this.props.postObj.poster_name,
        poster_id: this.props.postObj.poster_id
    }


    editHandler = (e) => {
        e.preventDefault()
        this.props.editHandler(this.state)

    }

    changeHelper =(e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    

    render() {
        // console.log("user", this.props.user)
        // console.log("postObj", this.props.postObj)
        return (
            <>
            <br/><br/>
            <h2>Edit Post {this.props.postObj.id}</h2>
            <div className="formCenter" >
            <Form onSubmit = {this.editHandler} style={{ width: "400px" }}>

                {/* Mood rating begin */}
                <FormGroup tag="fieldset">
                    <legend style={{fontSize:"1rem"}}>How are you feeling today?</legend>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="Awesome!"
                            name="mood_rating"
                            checked={this.state.mood_rating === "Awesome!"}
                            onChange={this.changeHelper}/>
                            Awesome!
                    </Label>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="Pretty good"
                            name="mood_rating"
                            checked={this.state.mood_rating === "Pretty good"}
                            onChange={this.changeHelper}/>
                            Pretty good
                    </Label> 
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="Doing okay"
                            name="mood_rating"
                            checked={this.state.mood_rating === "Doing okay"}
                            onChange={this.changeHelper}/>
                            Doing okay
                    </Label> 
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="A little down"
                            name="mood_rating"
                            checked={this.state.mood_rating === "A little down"}
                            onChange={this.changeHelper}/>
                            A little down
                    </Label> 
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="Could be better"
                            name="mood_rating"
                            checked={this.state.mood_rating === "Could be better"}
                            onChange={this.changeHelper}/>
                            Could be better
                    </Label> 
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="Having a hard time"
                            name="mood_rating"
                            checked={this.state.mood_rating === "Having a hard time"}
                            onChange={this.changeHelper}/>
                            Having a hard time
                    </Label> 
                </FormGroup>
                
                </FormGroup>
                <br/><br/>


                {/* Mood length begin */}
                <FormGroup tag="fieldset">
                    <legend style={{fontSize:"1rem"}}>How long have you been feeling this way?</legend>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="Just today"
                            name="mood_length"
                            checked={this.state.mood_length === "Just today"}
                            onChange={this.changeHelper}/>
                            Just today
                    </Label>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="A few days"
                            name="mood_length"
                            checked={this.state.mood_length === "A few days"}
                            onChange={this.changeHelper}/>
                            A few days
                    </Label> 
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="A few weeks"
                            name="mood_length"
                            checked={this.state.mood_length === "A few weeks"}
                            onChange={this.changeHelper}/>
                            A few weeks
                    </Label> 
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="1-6 months"
                            name="mood_length"
                            checked={this.state.mood_length === "1-6 months"}
                            onChange={this.changeHelper}/>
                            1-6 months
                    </Label> 
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="6-12 months"
                            name="mood_length"
                            checked={this.state.mood_length === "6-12 months"}
                            onChange={this.changeHelper}/>
                            6-12 months
                    </Label> 
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="Over a year"
                            name="mood_length"
                            checked={this.state.mood_length === "Over a year"}
                            onChange={this.changeHelper}/>
                            Over a year
                    </Label> 
                </FormGroup>
                
                </FormGroup>
                <br/><br/>


                <FormGroup>
                    <Label style={{fontSize:"1rem"}} for="mood_location">Where are you when you are feeling this way?</Label>
                    <Input onChange={this.changeHelper} type="text" name="mood_location" value={this.state.mood_location} />
                </FormGroup>
                <br/><br/>

                <FormGroup tag="fieldset">
                    <legend  style={{fontSize:"1rem"}}>Do you know what may trigger this feeling?</legend>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="Yes"
                            name="mood_trigger"
                            checked={this.state.mood_trigger === "Yes"}
                            onChange={this.changeHelper}/>
                            Yes
                    </Label>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="No"
                            name="mood_trigger"
                            checked={this.state.mood_trigger === "No"}
                            onChange={this.changeHelper}/>
                            No
                    </Label>
                </FormGroup>

                <FormGroup>
                    <Label style={{fontSize:"1rem"}} for="mood_trigger_detail">If yes, what is it?</Label>
                    <Input onChange={this.changeHelper} 
                    type="text" 
                    name="mood_trigger_detail" 
                    value={this.state.mood_trigger === "Yes" ? this.state.mood_trigger_detail : ""}
                    disabled={this.state.mood_trigger === "Yes" ? '' : 'disabled'} />
                </FormGroup>

                </FormGroup>
                <br/><br/>

                <FormGroup>
                    <Label style={{fontSize:"1rem"}} for="mood_description">Okay, thanks for that info. <br/>  Now, describe the feeling as best as you can:</Label>
                    <textarea style={{ fontSize:"1rem", width: "400px", height: "300px", border: "1px solid #ced4da" }} onChange={this.changeHelper} 
                    type="text" 
                    name="mood_description" 
                    value={this.state.mood_description} />
                </FormGroup>

                <br/><br/>


                <FormGroup tag="fieldset">
                    <legend style={{fontSize:"1rem"}}>Do you want to use this post to:</legend>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="Give Support"
                            name="mood_purpose"
                            checked={this.state.mood_purpose === "Give Support"}
                            onChange={this.changeHelper}/>
                            Give Support
                    </Label>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="Get Support"
                            name="mood_purpose"
                            checked={this.state.mood_purpose === "Get Support"}
                            onChange={this.changeHelper}/>
                            Get Support
                    </Label>
                </FormGroup>

                </FormGroup>
                <br/><br/>

                <FormGroup>
                    <Label style={{fontSize:"1rem"}} for="mood_title">Great, thanks for sharing!<br/>What would you like to call this post?</Label>
                    <Input 
                        onChange={this.changeHelper} 
                        type="text" 
                        name="mood_title" 
                        value={this.state.mood_title} />
                </FormGroup>
                <br/><br/>




                <FormGroup tag="fieldset">
                    <legend style={{fontSize:"1rem"}}>Lastly, how should we categorize this post?</legend>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="Family"
                            name="mood_category"
                            checked={this.state.mood_category === "Family"}
                            onChange={this.changeHelper}/>
                            Family
                    </Label>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="Work"
                            name="mood_category"
                            checked={this.state.mood_category === "Work"}
                            onChange={this.changeHelper}/>
                            Work
                    </Label>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="School"
                            name="mood_category"
                            checked={this.state.mood_category === "School"}
                            onChange={this.changeHelper}/>
                            School
                    </Label>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="Friends"
                            name="mood_category"
                            checked={this.state.mood_category === "Friends"}
                            onChange={this.changeHelper}/>
                            Friends
                    </Label>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="Relationships"
                            name="mood_category"
                            checked={this.state.mood_category === "Relationships"}
                            onChange={this.changeHelper}/>
                            Relationships
                    </Label>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="Self-confidence"
                            name="mood_category"
                            checked={this.state.mood_category === "Self-confidence"}
                            onChange={this.changeHelper}/>
                            Self-confidence
                    </Label>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input 
                            type="radio" 
                            value="Other"
                            name="mood_category"
                            checked={this.state.mood_category === "Other"}
                            onChange={this.changeHelper}/>
                            Other
                    </Label>
                </FormGroup>

                <FormGroup>
                    <Label style={{fontSize:"1rem"}} for="mood_category">If other, what is it?</Label>
                    <Input onChange={this.changeHelper} 
                    type="text" 
                    name="mood_category_detail" 
                    value={this.state.mood_category === "Other" ? this.state.mood_category_detail  : ''}
                    disabled={this.state.mood_category !== "Other" ? 'disabled' : ''} />
                </FormGroup>


                </FormGroup>
                <br/>

                <Button color="secondary" disabled={this.props.user.id !== this.props.postObj.poster_id}>Submit</Button>
            </Form>
            </div>
        </>
        )
    }
}

export default EditPostForm