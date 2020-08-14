import React, { Component } from 'react'
import axios from "axios";
import { Spinner, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import AdminNav from "../../../Components/AdminNav.component";

export default class RejectRequest extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            eventId : "",
            eventName : "",
            eventDate : "",
            name : "",
            number : "",
            email : "",
            heads : "",
            available : "",
            Eid: "",
            Ename: "",
            Edate: "",
            Evenue: "",
            Edescription: "",
            EheadCount: "",
            modal: false,
        }
    }

    delete = async () => {
        await axios.delete("http://localhost:8080/deleteEventRequest/"+this.props.match.params.id)
        .then(res => {
            this.setState({
                loading: false
            });
            this.props.history.push("/admin/requestlist/"+this.state.eventId);
        }) 
    }

    updateEvent = async () => {
        const obj = {
            id: this.state.Eid,
            name: this.state.Ename,
            date: this.state.Edate,
            venue: this.state.Evenue,
            description: this.state.Edescription,
            headCount: this.state.EheadCount,
            available : parseInt(this.state.available)-parseInt(this.state.heads)
        };
        console.log(obj);
        axios.post("http://localhost:8080/updateEvent", obj)
            .then((res) => {
                this.delete();
            })       
    }

    addToConfirmed = async () => {
        if(parseInt(this.state.heads) > parseInt(this.state.available)){
            this.setState({
                loading : false,
                modal : true
            });
        }
        else{
            const obj = {
                eventId : this.state.eventId,
                eventName : this.state.eventName,
                eventDate : this.state.eventDate,
                name : this.state.name,
                number : this.state.number,
                email : this.state.email,
                heads : this.state.heads
            };
            axios.post("http://localhost:8080/addConfirmedEventRequest", obj)
                .then((res) => {
                    this.updateEvent();
                })   
        }
    }

    getEventAvailable = async (eventid) => {
        await axios.get("http://localhost:8080/findAllEvents/"+eventid)
        .then(res => {
            this.setState({
                Eid: res.data.id,
                Ename: res.data.name,
                Edate: res.data.date,
                Evenue: res.data.venue,
                Edescription: res.data.description,
                EheadCount: res.data.headCount,
                available : res.data.available,
            });
            this.addToConfirmed();
        }) 
    }

    componentDidMount = async () => {
        await axios.get("http://localhost:8080/getEventRequests/"+this.props.match.params.id)
        .then(res => {
            this.setState({
                eventId : res.data.eventId,
                eventName : res.data.eventName,
                eventDate : res.data.eventDate,
                name : res.data.name,
                number : res.data.number,
                email : res.data.email,
                heads : res.data.heads
            });
            this.getEventAvailable(res.data.eventId);
        }) 
        .catch((error) => {
            this.props.history.push("/admin/eventlist/");
        });   
    }

    render() { 
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
                            <Button outline color="info" onClick={this.delete} block>I uderstand</Button>
                        </div>
                        </ModalBody>
                    </Modal>
                : null } 
                <AdminNav/>   
            </React.Fragment>
        )  
    }
}
