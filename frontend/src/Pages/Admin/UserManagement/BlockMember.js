import React, { Component } from 'react'
import axios from "axios";
import { Table, Spinner, Container } from "reactstrap";
import AdminNav from "../../../Components/AdminNav.component";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faStar, faMapMarkerAlt, faEdit, faUserCircle, faEnvelope, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';

const backendURI = require("../../../BackEndURI");

class BlockMember extends Component {

    constructor(props) {
        super(props)
        this.state = {
            UserList: [],
            loading: true,
        }
    }

    componentDidMount = async () => {
        await axios.get(backendURI.url+"/userdata/findblock")
        .then(res => {
            this.setState({ 
                UserList: res.data,
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
            <div>
                <p>
                    <center>Block List</center>
                </p>
            </div> 
            <Container>
                
                    <div style={{ marginTop: "20px" }}>
                        <Table>
                            <tbody>
                        {this.state.UserList.map((BlockMember, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr>
                                        
                                        <td><FontAwesomeIcon icon={faUserCircle}/> {BlockMember.username}</td>
                                        <td> {BlockMember.lname}</td>
                                        <td><FontAwesomeIcon icon={faEnvelope}/> {BlockMember.email}</td>
                                        <td><FontAwesomeIcon icon={faIdCard}/> {BlockMember.urole}</td>
                                              
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
  
export default connect(mapStateToProps,null)(BlockMember);
