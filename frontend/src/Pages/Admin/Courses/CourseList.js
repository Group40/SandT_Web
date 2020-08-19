import React, { Component } from 'react'
import axios from "axios";
import { Col, Row, Form, Table, Spinner, Container, FormGroup, Input } from "reactstrap";
import AdminNav from "../../../Components/AdminNav.component";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faStar, faMapMarkerAlt, faEdit, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';

const backendURI = require("../../../BackEndURI");

class CourseList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            CourseList: [],
            loading: true,
            filterName: ""
        }
    }

    componentDidMount = async () => {
        await axios.get(backendURI.url+"/findAllCourses")
        .then(res => {
            this.setState({ 
                CourseList: res.data,
                loading: false
            })
        }) 
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        
    };

    reset = e => {
        this.setState({
            filterName: ""
        });
        document.getElementById("form").reset();
    };

    onSubmit(e) {
        e.preventDefault();
        this.setState({ 
            filterDate: this.state.filterName
        });
    }

    render() { 
        const filterName = this.state.filterName;
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
            <br/>
            <Container>
                
                    <Form id="form" onSubmit={this.onSubmit}>
                        <Row>
                            <Col xs="12" sm="5">
                                <FormGroup>
                                    <Input type="text" name="filterName" id="filterName" placeholder="Search by name here" onChange={this.onChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                
                <Row>
                    <div style={{ marginTop: "20px" }}>
                        <Table>
                            <tbody>
                        {this.state.CourseList.map((course, index) => {
                            if(filterName === ""){
                                return (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td><FontAwesomeIcon icon={faStar}/> {course.name}</td>
                                            <td><FontAwesomeIcon icon={faCalendarAlt}/> From age {course.ageGroupMin} to {course.ageGroupMin}</td>
                                            <td><FontAwesomeIcon icon={faMapMarkerAlt}/> {course.location}</td>
                                            <td><FontAwesomeIcon icon={faDollarSign}/> {course.price}</td>
                                            {(this.props.erole === '3')?
                                            <td><FontAwesomeIcon icon={faEdit}/> <Link to={"/admin/editcourse/"+course.id}>Edit/Delete</Link></td>    
                                            :
                                            <td><FontAwesomeIcon icon={faEdit}/> <Link to={"/crew/editcourse/"+course.id}>Edit/Delete</Link></td>    
                                            }
                                        </tr>
                                    </React.Fragment>
                                );
                            }
                            else{
                                if(course.name.toLowerCase().includes(filterName.toLowerCase())){
                                    return (
                                        <React.Fragment key={index}>
                                            <tr>
                                                <td><FontAwesomeIcon icon={faStar}/> {course.name}</td>
                                                <td><FontAwesomeIcon icon={faCalendarAlt}/> From age {course.ageGroupMin} to {course.ageGroupMin}</td>
                                                <td><FontAwesomeIcon icon={faMapMarkerAlt}/> {course.location}</td>
                                                <td><FontAwesomeIcon icon={faDollarSign}/> {course.price}</td>
                                                {(this.props.erole === '3') 
                                                ?
                                                <td><FontAwesomeIcon icon={faEdit}/> <Link to={"/admin/editcourse/"+course.id}>Edit/Delete</Link></td>    
                                                :
                                                <td><FontAwesomeIcon icon={faEdit}/> <Link to={"/crew/editcourse/"+course.id}>Edit/Delete</Link></td>    
                                                }   
                                            </tr>
                                        </React.Fragment>
                                    );
                                }
                                else{
                                    return null;
                                }
                            }  
                        })}  
                        </tbody>  
                        </Table>          
                    </div>  
                </Row>
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
  
export default connect(mapStateToProps,null)(CourseList);
