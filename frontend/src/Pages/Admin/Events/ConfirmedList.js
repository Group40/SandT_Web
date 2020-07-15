import React, { Component } from "react";
import axios from 'axios';
import { Table, Modal, ModalBody, ModalHeader, Container, Spinner, Button } from 'reactstrap';
import AdminNav from "../../../Components/AdminNav.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faAddressBook, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default class ConfirmedList extends Component {
   
    
    constructor(props) {
        super(props);
    
        this.state = {
            RequestList: [],
            loading: true,
        };
    }

    componentDidMount = async () => {
        await axios.get("http://localhost:8080/getConfirmedEventRequestsByEventId/"+this.props.match.params.id)
        .then(res => {
            this.setState({ 
                RequestList: res.data,
                loading: false
            })
        }) 
    }
      
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