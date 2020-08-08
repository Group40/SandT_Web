import React, { Component } from "react";
import axios from 'axios';
import { Container, Spinner, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import AdminNav from "../../../Components/AdminNav.component";
import Logo from "../../../Images/logo.jpg";

export default class addCourse extends Component {
   
    
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            loading: false,
            alert: 0,
            alertMsg: "",
            name: "",
            ageGroupMin: "",
            ageGroupMax: "",
            price: "",
            location: "",
            description: "",
            url: ""
        };
    }

    closeAlert = () => {
        this.setState({ alert: 0 });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        
    };

    reset = e => {
        this.setState({
            alert: 0,
            alertMsg: "",
            name: "",
            ageGroupMin: "",
            ageGroupMax: "",
            price: "",
            location: "",
            description: "",
            url: ""
        });
        document.getElementById("form").reset();
    };

    validate = () => {
        let error = false;
        let alertMsg = "";
        if (this.state.name.length < 1) {
            error = true;
            alertMsg = "Name can't be empty";
        }
        else if (this.state.ageGroupMin.length < 1) {
            error = true;
            alertMsg = "Minimum age can't be empty";
        }
        else if (this.state.ageGroupMax.length < 1) {
            error = true;
            alertMsg = "Maximum age can't be empty";
        }
        else if (this.state.price.length < 1) {
            error = true;
            alertMsg = "Price can't be empty";
        }
        else if (this.state.location.length < 1) {
            error = true;
            alertMsg = "Location can't be empty";
        }
        else if (this.state.description.length < 1) {
            error = true;
            alertMsg = "Description can't be empty";
        }
        else if (this.state.url.length < 1) {
            error = true;
            alertMsg = "Url can't be empty";
        }
        else if (parseInt(this.state.ageGroupMin) < 0) {
            error = true;
            alertMsg = "Age cannot be minus";
        }
        else if (parseInt(this.state.ageGroupMax) < parseInt(this.state.ageGroupMin)) {
            error = true;
            alertMsg = "Maximum age should be greater than minimum age";
        }
        else if (parseInt(this.state.price) < 0) {
            error = true;
            alertMsg = "Price cannot be minus";
        }
    
        this.setState({alertMsg: alertMsg});
        return error;  
    }

    onSubmit(e) {
        e.preventDefault();
        const error = this.validate();
        this.setState({ 
            loading: true,
            alert: 0
        });
        if(!error){
            const obj = {
                name: this.state.name,
                ageGroupMin: this.state.ageGroupMin,
                ageGroupMax: this.state.ageGroupMax,
                price: this.state.price,
                location: this.state.location,
                description: this.state.description,
                url: this.state.url,
                likedUsers: [],
                commentedUsers: []   
            };
            console.log(obj);
            axios.post("http://localhost:8080/addCourse", obj)
                .then((res) => {
                    console.log("done");
                    this.setState({ alert: 0 });
                    this.reset();
                    window.location.reload(false);
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        alertMsg: "Server is under maintanace, please try again later!",
                        alert: 1,
                        loading: false
                    });
                });        
        }
        else{
            this.setState({ 
                alert: 1,
                loading: false 
            });
        }     
    }
    
    render(){
        return (
            <React.Fragment>
                <AdminNav/>
                <Container>
                    <Row>
                        <Col xs="12" sm="5">
                            <div>
                                <div className="center">
                                    <img src={Logo} alt="S & T Group" style={{justifyContent: 'center',alignItems: 'center',}}/>
                                    
                                        <h4>S & T Group</h4>
                                        Add a new course
                                
                                </div>
                            </div>
                        </Col>

                        <Col  xs="12" sm="7">
                            <div className="center2">
                                <Form id="form" onSubmit={this.onSubmit}>
                                    <Row>
                                        <Col xs="12" sm="12">
                                            <FormGroup>
                                                <Label for="name">Course Name</Label>
                                                <Input type="text" name="name" id="name" placeholder="Course Name" onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12" sm="6">
                                            <FormGroup>
                                                <Label for="price">Price</Label>
                                                <Input height="2" type="number" name="price" id="price" placeholder="25" onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="3">
                                            <FormGroup>
                                                <Label for="geGroupMin">Minimum Age</Label>
                                                <Input height="2" type="number" name="ageGroupMin" id="ageGroupMin" placeholder="25" onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="3">
                                            <FormGroup>
                                                <Label for="ageGroupMax">Maximum Age</Label>
                                                <Input height="2" type="number" name="ageGroupMax" id="ageGroupMax" placeholder="25" onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
           
                                    <Row>
                                        <Col xs="12" sm="12">
                                            <FormGroup>
                                                <Label for="location">Location</Label>
                                                <Input type="text" name="location" id="location" placeholder="Location" onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12" sm="12">
                                            <FormGroup>
                                                <Label for="url">Url</Label>
                                                <Input type="text" name="url" id="url" placeholder="Url" onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <FormGroup>
                                        <Label for="description">Description</Label>
                                        <Input type="textarea" name="description" id="description" onChange={this.onChange}/>
                                    </FormGroup>
                                    
                                    <Row xs="12" sm="12">
                                        <center>
                                            { this.state.loading ?
                                                <Spinner animation="border" className="spinner2" alignItems="center"/>
                                            : null}
                                        </center>
                                    </Row>
                                    
                                    { this.state.alert === 1 ?
                                        <Alert color="info" status={this.state.alert}>
                                            {this.state.alertMsg}
                                        </Alert>
                                    : null }
                                    <Row>
                                        <Col xs="6" sm="6">
                                            <Button outline color="info" onClick={this.reset} block>Reset</Button>
                                        </Col>
                                        <Col xs="6" sm="6">
                                            <Button outline color="info" type="submit" length="100" block>Add</Button>
                                        </Col>
                                    </Row>        
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }  
}

