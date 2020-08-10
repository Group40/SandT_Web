import React, { Component } from 'react'
import axios from "axios";
import { Table, Spinner, Container } from "reactstrap";
import AdminNav from "../../Components/AdminNav.component";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faStar, faMapMarkerAlt, faEdit, faDollarSign } from "@fortawesome/free-solid-svg-icons";
export default class Notification extends Component {

    constructor(props) {
        super(props)
        this.state = {
            CourseList: [],
            loading: true,
        }
    }

    componentDidMount = async () => {
        await axios.get("http://localhost:8080/findAllNotifications")
        .then(res => {
            this.setState({ 
                NotificationList: res.data,
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
                        {this.state.NotificationList.map(function(notification, index) {
                            return (
                                <React.Fragment key={index}>
                                    <tr>
                    <td>
                                        
                                    {(notification.authorType == "3")
                ?
                //Admin----------------------------------------------
                (notification.eventDate == null)
                    ?
                    //Course
                    
                        notification.authorName +
                            " who has access as an admin " +
                            notification.nameType +
                            " '" +
                            notification.name +
                            "' from " +
                            notification.authorMail +
                            " on " +
                            notification.date.substring(0, 10) +
                            " at " +
                            notification.date.substring(11, 20)
                    :
                    //Event
                    
                    notification.authorName +
                            " who has access as an admin " +
                            notification.nameType +
                            " '" +
                            notification.name +
                            "' (event date : " +
                            notification.eventDate +
                            ") from " +
                            notification.authorMail +
                            " on " +
                            notification.date.substring(0, 10) +
                            " at " +
                            notification.date.substring(11, 20)
                :
                //Crew Member----------------------------------------
                (notification.eventDate == null)
                    ?
                    //Course
                    
                    notification.authorName +
                            " who has access as a crew member " +
                            notification.nameType +
                            " '" +
                            notification.name +
                            "' (event date : " +
                            notification.eventDate +
                            ") from " +
                            notification.authorMail +
                            " on " +
                            notification.date.substring(0, 10) +
                            " at " +
                            notification.date.substring(11, 20)
                    :
                    //Event
                    
                    notification.authorName +
                            " who has access as a crew member " +
                            notification.nameType +
                            " '" +
                            notification.name +
                            "' (event date : " +
                            notification.eventDate +
                            ") from " +
                            notification.authorMail +
                            " on " +
                            notification.date.substring(0, 10) +
                            " at " +
                            notification.date.substring(11, 20)}
                        </td>
                                          
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
