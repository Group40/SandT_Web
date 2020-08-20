import React, { Component } from 'react'
import axios from "axios";
import { Table, Spinner, Container } from "reactstrap";
import AdminNav from "../../../Components/AdminNav.component";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faStar, faMapMarkerAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';

const backendURI = require("../../../BackEndURI");

class EventList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            EventList: [],
            loading: true,
        }
    }

    componentDidMount = async () => {
        await axios.get(backendURI.url+"/findAllEvents")
        .then(res => {
            this.setState({ 
                EventList: res.data,
                loading: false
            })
        }) 
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
            <Container>
                
                    <div style={{ marginTop: "20px" }}>
                        <Table>
                            <tbody>
                        {this.state.EventList.map((event, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td><FontAwesomeIcon icon={faStar}/> {event.name}</td>
                                        <td><FontAwesomeIcon icon={faCalendarAlt}/> {event.date}</td>
                                        <td><FontAwesomeIcon icon={faMapMarkerAlt}/> {event.venue}</td>
                                        {(this.props.erole === '3')?
                                        <td><FontAwesomeIcon icon={faEdit}/> <Link to={"/admin/editevent/"+event.id}>Edit/Delete</Link></td>
                                        :
                                        <td><FontAwesomeIcon icon={faEdit}/> <Link to={"/crew/editevent/"+event.id}>Edit/Delete</Link></td>
                                        }       
                                    </tr>
                                </React.Fragment>
                            );
                        })}  
                        </tbody>  
                        </Table>          
                    </div>  
                
            </Container>        
            </React.Fragment>
        )  
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    erole: state.auth.erole,
    username: state.auth.username
});
  
export default connect(mapStateToProps,null)(EventList);
