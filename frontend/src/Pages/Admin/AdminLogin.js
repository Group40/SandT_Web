import React, { Component } from "react";
import { Container, Spinner, Row, Col, Alert, Button, Form, FormGroup, Input } from 'reactstrap';
import Background from '../../Images/background1.jpg';
import { Redirect } from 'react-router';

var sectionStyle = {
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${Background})`
};

export default class AdminLogin extends Component {
   
    
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            loading: false,
            alert: 0,
            alertMsg: "",
            username: "",
            password: "",
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
            username: "",
            password: "",
        });
        document.getElementById("form").reset();
    };

    validate = () => {
        let error = false;
        let alertMsg = "";
        if (this.state.username.length < 1) {
            error = true;
            alertMsg = "Enter Username";
        }
        if (this.state.password.length < 1) {
            error = true;
            alertMsg = "Enter Password";
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
            this.setState({ 
                loading: false 
            });
            return <Redirect push to="/menucards"/>;
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
            <section style={ sectionStyle }>
            <React.Fragment>
                
                <Container>
                    <Row>
                        <Col xs="0" sm="4"></Col>

                        <Col  xs="12" sm="4">
                            <br/><br/><br/><br/>
                            <div className="center">
                                <Form id="form" onSubmit={this.onSubmit}>
                                   
                                    <FormGroup>
                                        <Input type="text" name="username" placeholder="Username" id="username" onChange={this.onChange}/>
                                    </FormGroup>

                                    <FormGroup>
                                        <Input type="password" name="password" placeholder="Password" id="password" onChange={this.onChange}/>
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
                                        
                                        <Col xs="12" sm="12">
                                            <Button outline color="info" type="submit" length="100" block>Log In</Button>
                                        </Col>
                                        
                                    </Row>        
                                </Form>
                            </div>
                        </Col>
                        <Col xs="0" sm="4"></Col>
                    </Row>
                </Container>
            </React.Fragment>
            </section>
        );
    }  
}