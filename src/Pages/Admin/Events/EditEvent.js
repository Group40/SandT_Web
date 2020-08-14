import React, { Component } from "react";
import axios from 'axios';
import { Modal, ModalBody, ModalHeader, Container, Spinner, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'reactstrap-date-picker';
import AdminNav from "../../../Components/AdminNav.component";
import Logo from "../../../Images/logo.jpg";

export default class EditEvent extends Component {
   
    
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            fieldLoading: true,
            loading: false,
            alert: 0,
            alertMsg: "",
            name: "",
            date: "",
            venue: "",
            description: "",
            headCount: "",
            dateValue: new Date().toISOString(),
            modal: false
        };
    }

    componentDidMount = async () => {
        await axios.get("http://localhost:8080/findAllEvents/"+this.props.match.params.id)
        .then(res => {
            this.setState({ 
                dateValue: res.data.date,
                name: res.data.name,
                date: res.data.date,
                venue: res.data.venue,
                description: res.data.description,
                headCount: res.data.headCount,
                fieldLoading: false
            })
        }) 
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

    toggle = () => {
        this.setState({
          modal: !this.state.modal,
        });
    };
    
    delete = async () => {
        await axios.delete("http://localhost:8080/deleteEventRequestByEventId/"+this.props.match.params.id)
        .then(res => {
            axios.delete("http://localhost:8080/deleteConfirmedEventRequestByEventId/"+this.props.match.params.id)
            .then(res => {
                axios.delete("http://localhost:8080/deleteEvent/"+this.props.match.params.id)
                .then(res => {
                    this.props.history.goBack();
                }) 
            }) 
        })       
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
            const obj = {
                id: this.props.match.params.id,
                name: this.state.name,
                date: document.getElementById("datepicker").value.substring(0, 10),
                venue: this.state.venue,
                description: this.state.description,
                headCount: this.state.headCount,
                available: this.state.headCount
            };
            console.log(obj);
            axios.post("http://localhost:8080/updateEvent", obj)
                .then((res) => {
                    console.log("done");
                    this.setState({ alert: 0 });
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
        if (this.state.fieldLoading){
            return(
                <React.Fragment>
                    <AdminNav/>
                    <div className="middle">
                        <Spinner color="info" style={{ width: '100', height: '100' }}/>
                    </div>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                { this.state.modal ?
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Are you sure?</ModalHeader>
                        <ModalBody>
                        <div className="container">
                            <Button outline color="info" onClick={this.delete} block>Yes</Button>
                        </div>
                        </ModalBody>
                    </Modal>
                : null }
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
                                <Row>
                                    <Col xs="6" sm="6">
                                        <Button outline color="info" href={"/admin/requestlist/"+this.props.match.params.id} block>Request List</Button>
                                    </Col>
                                    <Col xs="6" sm="6">
                                        <Button outline color="info" href={"/admin/confirmedlist/"+this.props.match.params.id} block>Confirmed List</Button>
                                    </Col>
                                </Row>
                                <Form id="form" onSubmit={this.onSubmit}>
                                    <Row>
                                        <Col xs="12" sm="8">
                                            <FormGroup>
                                                <Label for="name">Event Name</Label>
                                                <Input type="text" name="name" id="name" value={this.state.name} onChange={this.onChange}/>
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
                                                <Input type="text" name="venue" id="venue" value={this.state.venue} onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="3">
                                            <FormGroup>
                                                <Label for="headCount">Head Count</Label>
                                                <Input height="2" type="number" name="headCount" id="headCount" value={this.state.headCount} onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
           
                                    <FormGroup>
                                        <Label for="description">Description</Label>
                                        <Input type="textarea" name="description" id="description" value={this.state.description} onChange={this.onChange}/>
                                    </FormGroup>
                                    
                                    <Row xs="12" sm="12">
                                        <center>
                                            { this.state.loading ?
                                                <Spinner animation="border" className="spinner2"/>
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
                                            <Button outline color="info" onClick={this.toggle} block>Delete</Button>
                                        </Col>
                                        <Col xs="6" sm="6">
                                            <Button outline color="info" type="submit" length="100" block>Edit</Button>
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