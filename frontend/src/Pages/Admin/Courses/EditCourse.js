import React, { Component } from "react";
import axios from 'axios';
import { Modal, ModalBody, ModalHeader, Container, Spinner, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import AdminNav from "../../../Components/AdminNav.component";
import Logo from "../../../Images/logo.jpg";
import { connect } from 'react-redux';

var tzoffset = (new Date()).getTimezoneOffset() * 60000; 
var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

const backendURI = require("../../../BackEndURI");

class EditCourse extends Component {
   
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            fieldLoading: true,
            loading: false,
            alert: 0,
            alertMsg: "",
            name: "",
            ageGroupMin: "",
            ageGroupMax: "",
            price: "",
            location: "",
            description: "",
            url: "",
            modal: false
        };
    }

    componentDidMount = async () => {
        await axios.get(backendURI.url+"/findAllCourses/"+this.props.match.params.id)
        .then(res => {
            this.setState({ 
                name: res.data.name,
                ageGroupMin: res.data.ageGroupMin,
                ageGroupMax: res.data.ageGroupMax,
                price: res.data.price,
                location: res.data.location,
                description: res.data.description,
                url: res.data.url,
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

    toggle = () => {
        this.setState({
          modal: !this.state.modal,
        });
    };
    
    delete = async () => {
        tzoffset = (new Date()).getTimezoneOffset() * 60000; 
        localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
        const obj3 = {
            authorName: this.props.username+" "+this.props.lname,
            authorType: this.props.erole,
            authorMail: this.props.email,
            name: this.state.name,
            nameType: "deleted the course",
            date: localISOTime
        };
        await axios.delete(backendURI.url+"/deleteCourse/"+this.props.match.params.id)
        .then(res => {
            axios.post(backendURI.url+"/addNotification", obj3)
            .then(res => {
                this.props.history.goBack();
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
            tzoffset = (new Date()).getTimezoneOffset() * 60000; 
            localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
            const obj = {
                id: this.props.match.params.id,
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
            const obj2 = {
                authorName: this.props.username+" "+this.props.lname,
                authorType: this.props.erole,
                authorMail: this.props.email,
                name: this.state.name,
                nameType: "edited the course",
                date: localISOTime
            };
            console.log(obj);
            axios.post(backendURI.url+"/updateCourse", obj)
                .then((res) => {
                    axios.post(backendURI.url+"/addNotification", obj2)
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
                                        Edit Course
                                
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
                                                <Input type="text" name="name" id="name" value={this.state.name} onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12" sm="6">
                                            <FormGroup>
                                                <Label for="price">Price</Label>
                                                <Input height="2" type="number" name="price" id="price" value={this.state.price} onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="3">
                                            <FormGroup>
                                                <Label for="geGroupMin">Minimum Age</Label>
                                                <Input height="2" type="number" name="ageGroupMin" id="ageGroupMin" value={this.state.ageGroupMin} onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="3">
                                            <FormGroup>
                                                <Label for="ageGroupMax">Maximum Age</Label>
                                                <Input height="2" type="number" name="ageGroupMax" id="ageGroupMax" value={this.state.ageGroupMax} onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
           
                                    <Row>
                                        <Col xs="12" sm="12">
                                            <FormGroup>
                                                <Label for="location">Location</Label>
                                                <Input type="text" name="location" id="location" value={this.state.location} onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12" sm="12">
                                            <FormGroup>
                                                <Label for="url">Url</Label>
                                                <Input type="text" name="url" id="url" value={this.state.url} onChange={this.onChange}/>
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

const mapStateToProps = state => ({
    erole: state.auth.erole,
    username: state.auth.username,
    lname : state.auth.lname,
    email : state.auth.email,
  });
  
  export default connect(mapStateToProps,null)(EditCourse);