import React, { Component } from "react";
import axios from 'axios';
import { Table, Modal, ModalBody, ModalHeader, Container, Spinner, Button } from 'reactstrap';
import AdminNav from "../../../Components/AdminNav.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faAddressBook, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';

const backendURI = require("../../../BackEndURI");

class RequestList extends Component {
   
    
    constructor(props) {
        super(props);
        this.confirm = this.confirm.bind(this);
        this.state = {
            RequestList: [],
            loading: true,
            modal: false,
            available : "",
            Eid: "",
            Ename: "",
            Edate: "",
            Evenue: "",
            Edescription: "",
            EheadCount: "",
            currentRequest: null
        };
    }

    componentDidMount = async () => {
        await axios.get(backendURI.url+"/getEventRequestsByEventId/"+this.props.match.params.id)
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
    
    reject = async (request) => {
        this.setState({
            loading: true,
        });
        await axios.delete(backendURI.url+"/deleteEventRequest/"+request.id)
        .then(res => {
            axios.get(backendURI.url+"/getEventRequestsByEventId/"+this.props.match.params.id)
            .then(res => {
                this.setState({ 
                    RequestList: res.data,
                    loading: false
                })
            }) 
        })    
    }

    delete = async (request) => {
        await axios.delete(backendURI.url+"/deleteEventRequest/"+request.id)
        .then(res => {
            axios.get(backendURI.url+"/getEventRequestsByEventId/"+this.props.match.params.id)
            .then(res => {
                this.setState({ 
                    modal: false,
                    RequestList: res.data,
                    loading: false
                })
            }) 
        })   
    }

    updateEvent = async (request) => {
        const obj = {
            id: this.state.Eid,
            name: this.state.Ename,
            date: this.state.Edate,
            venue: this.state.Evenue,
            description: this.state.Edescription,
            headCount: this.state.EheadCount,
            available : parseInt(this.state.available)-parseInt(request.heads)
        };
        console.log(obj);
        axios.post(backendURI.url+"/updateEvent", obj)
            .then((res) => {
                this.delete(request);
            })       
    }

    addToConfirmed = async (request) => {
        if(parseInt(request.heads) > parseInt(this.state.available)){
            this.setState({
                loading : false,
                modal : true,
                currentRequest : request
            });
        }
        else{
            const obj = {
                eventId : request.eventId,
                eventName : request.eventName,
                eventDate : request.eventDate,
                name : request.name,
                number : request.number,
                email : request.email,
                heads : request.heads
            };
            axios.post(backendURI.url+"/addConfirmedEventRequest", obj)
                .then((res) => {
                    this.updateEvent(request);
                })   
        }
    }

    confirm(request){
        axios.get(backendURI.url+"/findAllEvents/"+request.eventId)
        .then(res => {
            this.setState({
                Eid: res.data.id,
                Ename: res.data.name,
                Edate: res.data.date,
                Evenue: res.data.venue,
                Edescription: res.data.description,
                EheadCount: res.data.headCount,
                available : res.data.available,
                loading : true,
            });
            this.addToConfirmed(request);
        }) 
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
                        <ModalHeader toggle={this.toggle}>Request was automatically rejected through the system</ModalHeader>
                        <ModalBody>
                        <div className="container">
                            Because you don't have enough available seats for the request
                            <Button outline color="info" onClick={() => this.delete(this.state.currentRequest)} block>I uderstand</Button>
                        </div>
                        </ModalBody>
                    </Modal>
                : null } 
                <AdminNav/>
                <Container>
                        <div style={{ marginTop: "20px" }}>
                            <Table>
                                <tbody>
                                    {this.state.RequestList.map((request, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <tr>
                                                    <td><FontAwesomeIcon icon={faUser}/> {request.name}</td>
                                                    <td><FontAwesomeIcon icon={faAddressBook}/> {request.number}</td>
                                                    <td><FontAwesomeIcon icon={faEnvelope}/> {request.email}</td>
                                                    <td><FontAwesomeIcon icon={faUsers}/> {request.heads}</td> 
                                                    <td><Button outline color="success" block onClick={() => this.confirm(request)}>
                                                            Confirm
                                                        </Button></td>
                                                    {/* {(this.props.erole === '3')? 
                                                    <td><Button outline color="success" href={"/admin/confirmrequest/"+request.id} block>Confirm</Button></td>  
                                                    :
                                                    <td><Button outline color="success" href={"/crew/confirmrequest/"+request.id} block>Confirm</Button></td>
                                                    } */}
                                                    <td><Button outline color="danger" block onClick={() => this.reject(request)}>
                                                            Reject
                                                        </Button></td>
                                                    {/* {(this.props.erole === '3')? 
                                                    <td><Button outline color="danger" href={"/admin/rejectrequest/"+request.id} block>Reject</Button></td>
                                                    :
                                                    <td><Button outline color="danger" href={"/crew/rejectrequest/"+request.id} block>Reject</Button></td>
                                                    } */}
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    erole: state.auth.erole,
    username: state.auth.username
});
  
export default connect(mapStateToProps,null)(RequestList);