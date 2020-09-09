import React from 'react'
import { Button, Form, FormGroup, Label, Input, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';


class Signup extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            age: "",
            gender: "",
            gender_other: false,
            location: ""
        }
    }

    changeHandler = (event) => {
        event.persist()
        this.setState({[event.target.name] : event.target.value}, () => {
            console.log(this.state.gender)
        if (this.state.gender === "Male" || this.state.gender === "Female") {
            this.setState({gender_other: false},() => console.log(this.state.gender_other))
        }
        })
    }

    otherGenderHandler = () => {
        this.setState({
            gender_other: true,
            gender: ""
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.submitHandler(this.state)
    }

    renderAgeDropdownItems = () => {
        let numArray = Array.apply(null, Array(100))
        return (
            numArray.map((key,index) => {
                return (
                    <option key={index}>{index}</option>
                )
            })
        )
    }

    render () {
        return (
            <>
                {this.props.user === false ?
                <>
                    <br/><br/><br/>
                    <h1>Feelings<strong>Overflow</strong></h1>
                    <br/><br/>
                    <h3>Sign Up</h3><br/>
                    
                    <div className="center">
                    
                        <Form onSubmit={event => this.submitHandler(event)} id="signup" style={{ width: "300px" }}>
                      
                            <FormGroup>
                                <Label for="username" className="mr-sm-2">Username</Label>
                                <Input style={{ width: "300px" }} type="text" name="username" placeholder="username" value={this.state.username} onChange={event => this.changeHandler(event)} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="password" className="mr-sm-2">Password</Label>
                                <Input style={{ width: "300px" }} type="password" name="password" placeholder="password" value={this.state.password} onChange={event => this.changeHandler(event)} />
                            </FormGroup>
                            
                            <FormGroup>
                                <Label for="age" className="mr-sm-2">Age</Label>
                                <Input style={{ width: "300px" }} type="date" name="age" placeholder="age" value={this.state.age} onChange={event => this.changeHandler(event)} />
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
                                        onChange={this.changeHandler}/>
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
                                        onChange={this.changeHandler}/>
                                        Female
                                </Label>
                            </FormGroup>

                            <FormGroup check>
                                <Label check>
                                    <Input 
                                        type="radio" 
                                        value={true}
                                        name="gender"
                                        checked={this.state.gender_other === true}
                                        onChange={this.otherGenderHandler}/>
                                        Other
                                </Label>
                            </FormGroup>

                            <FormGroup>
                                <Label for="gender">Please Specify:</Label>
                                <Input style={{ width: "300px" }} onChange={this.changeHandler} 
                                type="text" 
                                name="gender" 
                                value={this.state.gender_other ? this.state.gender : ""}
                                disabled={this.state.gender_other ? '' : 'disabled'} />
                            </FormGroup>

                            </FormGroup>

                            <FormGroup>
                                <Label for="location" className="mr-sm-2">Location</Label>
                                <Input style={{ width: "300px" }} type="text" name="location" placeholder="location" autoComplete="address-level1" value={this.state.location} onChange={event => this.changeHandler(event)} />
                            </FormGroup>

                            <Button type="submit" value="Login">Submit</Button><br/><br/>

                        </Form>
                    </div>
                    <NavLink style={{ color: "black" }} tag={Link} to="/login">Returning User? Log In!</NavLink>
                </>
                :
                <>
                    <div className="center">
                        <h1>Please logout before signing up!</h1>
                    </div> 
                    <button type="button" onClick={this.props.clickHandler}>Logout</button>
                </>
                }
                
            </>
        )
    }
}

export default Signup
