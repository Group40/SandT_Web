import React, { Component } from 'react'
import axios from "axios";
import { Table, Spinner, Container } from "reactstrap";
import AdminNav from "../../../Components/AdminNav.component";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faStar, faMapMarkerAlt, faEdit, faUserCircle, faEnvelope, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';

const backendURI = require("../../../BackEndURI");

class AdminMember extends Component {

    constructor(props) {
        super(props)
        this.state = {
            UserList: [],
            loading: true,
        }
    }

    componentDidMount = async () => {
        await axios.get(backendURI.url+"/userdata/findadmin")
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
                    <center>All Admins</center>
                </p>
            </div> 
            <Container>
                
                    <div style={{ marginTop: "20px" }}>
                        <Table>
                            <tbody>
                        {this.state.UserList.map((AdminMember, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr>
                                        
                                        <td><FontAwesomeIcon icon={faUserCircle}/> {AdminMember.username}</td>
                                        <td> {AdminMember.lname}</td>
                                        <td><FontAwesomeIcon icon={faEnvelope}/> {AdminMember.email}</td>
                                        <td><FontAwesomeIcon icon={faIdCard}/> {AdminMember.urole}</td>
                                        {(this.props.erole === '3')?
                                        <td><FontAwesomeIcon icon={faEdit}/> <Link to={"/admin/#"+AdminMember.id}>Make Crew</Link></td>
                                        :
                                        <td></td>
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
  
export default connect(mapStateToProps,null)(AdminMember);
