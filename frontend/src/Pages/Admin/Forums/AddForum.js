import React, { Component } from 'react';
// import { Container, Form, Label, Col, Row, FormGroup, Input, Button } from 'reactstrap';
import { Button, Container, Form, Label, Input } from 'semantic-ui-react'
import moment from 'moment'
import AdminNav from "../../../Components/AdminNav.component";
import axios from 'axios';

export default class AddForum extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: "",
            date: "",
            titleError: "",
            dateError: "",
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
            titleError: "",
            dateError: "",
        });
    }

    validate = () => {
        let isError = false;
        let titleError = "";
        let dateError = "";

        if(!this.state.title) {
            isError = true;
            titleError = "Title cannot be empty";
        }
        if(!this.state.date) {
            isError = true;
            dateError = "Date cannot be empty";
        }
        this.setState({ 
            titleError: titleError,
            dateError: dateError,
        });
        return isError;
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true,
            
        });
        const isValid = this.validate();

        if(!isValid) {
            console.log(this.state);
            axios.post("http://localhost:8080/addForum", {
                title: this.state.title,
                date: this.state.date,

            }).then ((response) => {
                console.log(response);
                this.setState({
                    title: '',
                    date: ''
                });
                window.location='/admin/viewforums';
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
        // const startDate = new Date();
        return (
            <React.Fragment>
                <AdminNav/>
                <Container className='center'>

                        <div className="add.forum">
                            <Form id="form" onSubmit={this.onSubmit}>
                                <Form.Field>
                                        <Form.Field>
                                            <label for="title">Event Title</label>
                                            <Input placeholder="Enter title" name="title" value={this.state.title} onChange={e => this.change(e)} />
                                            <div style={{fontSize: 12, color: "red"}}>{this.state.titleError}</div>
                                        </Form.Field>
                                        <Form.Field>
                                            <label for="date">Date</label>
                                            <Input type="date" id="datepicker" name="date" value={this.state.date} onChange={e => this.change(e)} mindate={moment().toDate()} />
                                            <div style={{fontSize: 12, color: "red"}}>{this.state.dateError}</div>
                                        </Form.Field>
                                </Form.Field>
                                <Form.Field>
                                        <Button outline color="info" onClick={this.reset} block>Cancel</Button>
                                        <Button outline color="info" type="submit" block>Add</Button>
                                </Form.Field>        
                            </Form>
                        </div>
                </Container>
            </React.Fragment>
        );
    }

    
}