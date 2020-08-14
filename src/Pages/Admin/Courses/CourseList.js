import React, { Component } from 'react'
import axios from "axios";
import { Table, Spinner, Container } from "reactstrap";
import AdminNav from "../../../Components/AdminNav.component";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faStar, faMapMarkerAlt, faEdit, faDollarSign } from "@fortawesome/free-solid-svg-icons";
export default class CourseList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            CourseList: [],
            loading: true,
        }
    }

    componentDidMount = async () => {
        await axios.get("http://localhost:8080/findAllCourses")
        .then(res => {
            this.setState({ 
                CourseList: res.data,
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
                        {this.state.CourseList.map(function(course, index) {
                            return (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td><FontAwesomeIcon icon={faStar}/> {course.name}</td>
                                        <td><FontAwesomeIcon icon={faCalendarAlt}/> From age {course.ageGroupMin} to {course.ageGroupMin}</td>
                                        <td><FontAwesomeIcon icon={faMapMarkerAlt}/> {course.location}</td>
                                        <td><FontAwesomeIcon icon={faDollarSign}/> {course.price}</td>
                                        <td><FontAwesomeIcon icon={faEdit}/> <Link to={"/admin/editcourse/"+course.id}>Edit/Delete</Link></td>    
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
