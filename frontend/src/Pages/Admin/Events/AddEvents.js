import React, { Component } from "react";
import axios from 'axios';
import { Container, Spinner, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'reactstrap-date-picker';
import AdminNav from "../../../Components/AdminNav.component";
import Logo from "../../../Images/logo.jpg";
import { connect } from 'react-redux';

var tzoffset = (new Date()).getTimezoneOffset() * 60000; 
var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

class addEvent extends Component {  
    
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            loading: false,
            alert: 0,
            alertMsg: "",
            name: "",
            date: "",
            venue: "",
            description: "",
            headCount: "",
            dateValue: localISOTime
        };
    }

    closeAlert = () => {
        this.setState({ alert: 0 });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        
    };

    onChangeDate(value){
        this.setState({
            dateValue: value,
        });   
    };

    reset = e => {
        this.setState({
            alert: 0,
            alertMsg: "",
            name: "",
            date: "",
            venue: "",
            description: "",
            headCount: "",
            dateValue: localISOTime

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
        if (document.getElementById("datepicker").value.substring(0, 10).length < 1) {
            error = true;
            alertMsg = "You have to pick a real date";
        }
        if (this.state.venue.length < 1) {
            error = true;
            alertMsg = "Vanue can't be empty";
        }
        if (this.state.description.length < 1) {
            error = true;
            alertMsg = "Description can't be empty";
        }
        parseInt(this.state.headCount)
        if (parseInt(this.state.headCount) === 0) {
            error = true;
            alertMsg = "Count can't be zero";
        }
        if (this.state.headCount.length < 1) {
            error = true;
            alertMsg = "Count can't be empty";
        }
        if (parseInt(this.state.headCount) < 0) {
            error = true;
            alertMsg = "Count can't be a negative value";
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
            tzoffset = (new Date()).getTimezoneOffset() * 60000; 
            localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
            const obj = {
                name: this.state.name,
                date: document.getElementById("datepicker").value.substring(0, 10),
                venue: this.state.venue,
                description: this.state.description,
                headCount: this.state.headCount,
                available: this.state.headCount
            };
            const obj2 = {
                authorName: this.props.username+" "+this.props.lname,
                authorType: this.props.erole,
                authorMail: this.props.email,
                name: this.state.name,
                nameType: "added a new event",
                date: localISOTime,
                eventDate: document.getElementById("datepicker").value.substring(0, 10)
            };
            console.log(obj);
            axios.post("http://localhost:8080/addEvent", obj)
                .then((res) => {
                    axios.post("http://localhost:8080/addNotification", obj2)
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
                                        Add a new event
                                
                                </div>
                            </div>
                        </Col>

                        <Col  xs="12" sm="7">
                            <div className="center">
                                <Form id="form" onSubmit={this.onSubmit}>
                                    <Row>
                                        <Col xs="12" sm="8">
                                            <FormGroup>
                                                <Label for="name">Event Name</Label>
                                                <Input type="text" name="name" id="name" placeholder="Astro" onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="4">
                                            <FormGroup>
                                                <Label for="date">Date</Label>
                                                <DatePicker id="datepicker" value={this.state.dateValue}  onChange={(v) => this.onChangeDate(v)}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12" sm="9">
                                            <FormGroup>
                                                <Label for="venue">Venue</Label>
                                                <Input type="text" name="venue" id="venue" placeholder="Colombo" onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="3">
                                            <FormGroup>
                                                <Label for="headCount">Head Count</Label>
                                                <Input height="2" type="number" name="headCount" id="headCount" placeholder="25" onChange={this.onChange}/>
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

const mapStateToProps = state => ({
    erole: state.auth.erole,
    username: state.auth.username,
    lname : state.auth.lname,
    email : state.auth.email,
  });
  
  export default connect(mapStateToProps,null)(addEvent);
  

