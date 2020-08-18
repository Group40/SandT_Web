import React, { Component } from 'react'
import axios from "axios";
import { Spinner } from "reactstrap";
import AdminNav from "../../../Components/AdminNav.component";

const backendURI = require("../../../BackEndURI");

export default class RejectRequest extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
        }
    }

    delete = async (eventid) => {
        await axios.delete(backendURI.url+"/deleteEventRequest/"+this.props.match.params.id)
        .then(res => {
            this.setState({
                loading: false
            });
            this.props.history.push("/admin/requestlist/"+eventid);
        }) 
    }

    componentDidMount = async () => {
        await axios.get(backendURI.url+"/getEventRequests/"+this.props.match.params.id)
        .then(res => {
            this.delete(res.data.eventId);
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
                <AdminNav/>   
            </React.Fragment>
        )  
    }
}
