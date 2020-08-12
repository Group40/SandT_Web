import React, { Component } from "react";
import { Container, Row, Col,  Card,  CardImg } from 'reactstrap';
import {Link} from 'react-router-dom';
import AdminNav from "../../../Components/AdminNav.component";
import list from '../../../Images/courselist.png';
import addcourse from '../../../Images/addcourses.png';

export default class CourseManagement extends Component {
     
    render(){
        return (
            <section>
            <React.Fragment>
                <AdminNav/>
                
                <Container>
                    <Row>
                        <Col xs="12" sm="6">
                            <div>
                                <div className="center">
                                    <Link to='/admin/courselist'>
                                        <Card outline color="info">
                                            <CardImg top width="100%" src={list} alt="Card image cap" />
                                        </Card>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col xs="12" sm="6">
                            <div>
                                <div className="center">
                                    <Link to='/admin/addcourses'>
                                        <Card outline color="info">
                                            <CardImg top width="100%" src={addcourse} alt="Card image cap" />
                                        </Card>
                                    </Link>
                                </div>
                            </div>
                        </Col> 
                    </Row>
                </Container>
               
            </React.Fragment>
            </section>
        );
    }  
}

