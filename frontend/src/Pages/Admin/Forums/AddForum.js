import React, { Component } from 'react';
import { Container, Form, Label, Col, Row, FormGroup, Input, Button } from 'reactstrap';
import AdminNav from "../../../Components/AdminNav.component";
import axios from 'axios';

export default class AddForum extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: "",
            date: "",
            startDate: "",
            startTime: "",
            titleError: "",
            dateError: "",
            startDateError: "",
            startTimeError: ""
        }
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    reset = e => {
        this.setState ({
            title: "",
            date: "",
            startDate: "",
            startTime: "",
            titleError: "",
            dateError: "",
            startDateError: "",
            startTimeError: "",
        });
    }

    validate = () => {
        let isError = false;
        let titleError = "";
        let dateError = "";
        let startDateError = "";
        let startTimeError = ""

        if(!this.state.title) {
            isError = true;
            titleError = "Title cannot be empty";
        }
        if(!this.state.date) {
            isError = true;
            dateError = "Date cannot be empty";
        }
        if(!this.state.startDate) {
            isError = true;
            startDateError = "Start date cannot be empty";
        }
        if(!this.state.startTime) {
            isError = true;
            startTimeError = "Start time cannot be empty";
        }
        this.setState({ 
            titleError: titleError,
            dateError: dateError,
            startDateError: startDateError,
            startTimeError: startTimeError,
        });
        return isError;
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        const isValid = this.validate();

        if(!isValid) {
            console.log(this.state);
            axios.post("http://localhost:8080/addForum", {
                title: this.state.title,
                date: this.state.date,
                startDate: this.state.startDate,
                startTime: this.state.startTime,

            }).then ((response) => {
                console.log(response);
            }).catch ((error) => {
                console.log(error);
            })
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <AdminNav/>
                <Container>

                    <Col xs="12" sm="8">
                        <div className="add.forum">
                            <Form id="form" onSubmit={this.onSubmit}>
                                <Row>
                                    <Col xs="12" sm="8">
                                        <FormGroup>
                                            <Label for="title">Event Title</Label>
                                            <Input placeholder="Enter title" name="title" value={this.state.title} onChange={e => this.change(e)} />
                                            <div style={{fontSize: 12, color: "red"}}>{this.state.titleError}</div>
                                        </FormGroup>
                                    </Col>
                                
                                    <Col xs="12" sm="4">
                                        <FormGroup>
                                            <Label for="date">Date</Label>
                                            <Input type="date" id="datepicker" name="date" value={this.state.date} onChange={e => this.change(e)} />
                                            <div style={{fontSize: 12, color: "red"}}>{this.state.dateError}</div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>

                                <Col xs="12" sm="6">
                                        <FormGroup>
                                            <Label for="startDate">Start date</Label>
                                            <Input type="date" id="startdatepicker" name="startDate" value={this.state.startDate} onChange={e => this.change(e)} />
                                            <div style={{fontSize: 12, color: "red"}}>{this.state.startDateError}</div>
                                        </FormGroup>
                                    </Col>

                                    <Col xs="12" sm="6">
                                        <FormGroup>
                                            <Label for="startTime">Start time</Label>
                                            <Input type="time" id="starttime" name="startTime" value={this.state.startTime} onChange={e => this.change(e)} />
                                            <div style={{fontSize: 12, color: "red"}}>{this.state.startTimeError}</div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="6" sm="6">
                                        <Button outline color="info" onClick={this.reset} block>Reset</Button>
                                    </Col>
                                    <Col xs="6" sm="6">
                                        <Button outline color="info" type="submit" block>Add</Button>
                                    </Col>
                                </Row>        
                            </Form>
                        </div>
                    </Col>
                </Container>
            </React.Fragment>
        );
    }

    
}