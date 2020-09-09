import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';


 class UserEditForm extends React.Component {

    state={
        age: "",
        gender: "",
        gender_other:"",
        location: ""
    }

    submitHelper = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)
    }


    locationChangeHandler = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            location: e.target.value
        })
    }

    genderChangeHandler = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            gender: e.target.value
        })
    }

    genderOtherChangeHandler = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            gender_other: e.target.value
        })
    }

    birthDateChangeHandler = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            age: e.target.value
        })
    }

    render() {
        return(
            <>
            <h3>Edit User Profile</h3><br/>
                    
                    <div className="formCenter">
                    
                    <Form onSubmit={this.submitHelper} style={{ width: "300px" }}>
                      
                      <FormGroup>
                          <Label for="age" className="mr-sm-2">Date of Birth</Label>
                          <Input type="date" name="age" placeholder="age" value={this.state.age} onChange={this.birthDateChangeHandler} />
                      </FormGroup>

                      <FormGroup tag="fieldset">
                  
                      <legend>Gender</legend>

                      <FormGroup check>
                          <Label check>
                              <Input 
                                  type="radio" 
                                  value="Male"
                                  name="gender"
                                  checked={this.state.gender === "Male"}
                                  onChange={this.genderChangeHandler}/>
                                  Male
                          </Label>
                      </FormGroup>

                      <FormGroup check>
                          <Label check>
                              <Input 
                                  type="radio" 
                                  value="Female"
                                  name="gender"
                                  checked={this.state.gender === "Female"}
                                  onChange={this.genderChangeHandler}/>
                                  Female
                          </Label>
                      </FormGroup>

                      <FormGroup check>
                          <Label check>
                              <Input 
                                  type="radio" 
                                  value="Other"
                                  name="gender"
                                  checked={this.state.gender === "Other"}
                                  onChange={this.genderChangeHandler} />
                                  Other
                          </Label>
                      </FormGroup>

                      <FormGroup>
                          <Label for="gender">Please Specify:</Label>
                          <Input onChange={this.genderOtherChangeHandler} 
                          type="text" 
                          name="gender_other" 
                          value={this.state.gender === "Other" ? this.state.gender_other : ''}
                          disabled={this.state.gender !== "Other" ? 'disabled' : ''} />
                      </FormGroup>

                      </FormGroup>

                      <FormGroup>
                          <Label for="location" className="mr-sm-2">Location</Label>
                          <Input type="text" name="location" placeholder="location" autoComplete="address-level1" value={this.state.location} onChange={this.locationChangeHandler}  />
                      </FormGroup>

                            <Button type="submit" value="Login">Submit</Button><br/><br/>

                            {/* <NavLink tag={Link} to="/login">Returning User? Log In!</NavLink> */}
                        </Form>
                    </div>
            </>
        )
    }

 }


export default UserEditForm