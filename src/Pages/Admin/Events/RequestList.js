import React, { Component } from "react";
import axios from 'axios';
import { Table, Modal, ModalBody, ModalHeader, Container, Spinner, Button } from 'reactstrap';
import AdminNav from "../../../Components/AdminNav.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faAddressBook, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default class RequestList extends Component {
   
    
    constructor(props) {
        super(props);
        this.confirm = this.confirm.bind(this);
        this.state = {
            RequestList: [],
            loading: true,
            modal: false
        };
    }

    componentDidMount = async () => {
        await axios.get("http://localhost:8080/getEventRequestsByEventId/"+this.props.match.params.id)
        .then(res => {
            this.setState({ 
                RequestList: res.data,
                loading: false
            })
        }) 
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal,
        });
    };
    
    delete = async () => {
        await axios.delete("http://localhost:8080/deleteEvent/"+this.props.match.params.id)
        .then(res => {
            this.props.history.goBack();
        }) 
    };

    confirm = e => {
        console.log("confirm");
    };
    
  

    render(){
        if (this.state.loading){
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
                        <div style={{ marginTop: "20px" }}>
                            <Table>
                                <tbody>
                                    {this.state.RequestList.map(function(request, index) {
                                        return (
                                            <React.Fragment key={index}>
                                                <tr>
                                                    <td><FontAwesomeIcon icon={faUser}/> {request.name}</td>
                                                    <td><FontAwesomeIcon icon={faAddressBook}/> {request.number}</td>
                                                    <td><FontAwesomeIcon icon={faEnvelope}/> {request.email}</td>
                                                    <td><FontAwesomeIcon icon={faUsers}/> {request.heads}</td>  
                                                    <td><Button outline color="success" href={"/admin/confirmrequest/"+request.id} block>Confirm</Button></td>  
                                                    <td><Button outline color="danger" href={"/admin/rejectrequest/"+request.id} block>Reject</Button></td>
                                                </tr>
                                            </React.Fragment>
                                        );
                                    })}    
                                </tbody>
                            </Table>          
                        </div>  
                </Container>
            </React.Fragment>
        );
    }  
}