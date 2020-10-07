import React, { Component } from "react";
import { Container, Row, Col,  Card,  CardImg } from 'reactstrap';
import {Link} from 'react-router-dom';
import AdminNav from "../../../Components/AdminNav.component";

import admin from '../../../Images/UserManagementImages/admin.jpg';
import crew from '../../../Images/UserManagementImages/crew.jpg';
import user from '../../../Images/UserManagementImages/user.jpg';
import block from '../../../Images/UserManagementImages/block.jpg';
import all from '../../../Images/UserManagementImages/all.jpg';
import { connect } from 'react-redux';

class UserButtons extends Component {
     
    render(){
        return (
            <section>
            <React.Fragment>
                <AdminNav/>
                
                <Container>
                    
                    
                    <Row>
                        <Col xs="12" sm="4">
                            <div>
                                <div className="center">
                                    <Link to='/admin/viewadminmember'>
                                        <Card outline color="info">
                                            <CardImg top width="100%" src={admin} alt="Card image cap" />
                                        </Card>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col xs="12" sm="4">
                            <div>
                                <div className="center">
                                    <Link to='/admin/viewcrewmember'>
                                        <Card outline color="info">
                                            <CardImg top width="100%" src={crew} alt="Card image cap" />
                                        </Card>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col xs="12" sm="4">
                            <div>
                                <div className="center">
                                    <Link to='/admin/viewusermember'>
                                        <Card outline color="info">
                                            <CardImg top width="100%" src={user} alt="Card image cap" />
                                        </Card>
                                    </Link>
                                </div>
                            </div>
                        </Col> 
                    </Row>
                    
                    <Row>
                        <Col xs="12" sm="4">
                            <div>
                                <div className="center">
                                    <Link to='/admin/viewallmember'>
                                        <Card outline color="info">
                                            <CardImg top width="100%" src={all} alt="Card image cap" />
                                        </Card>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col xs="12" sm="4">
                            <div>
                                <div className="center">
                                    <Link to='/admin/viewblockmember'>
                                        <Card outline color="info">
                                            <CardImg top width="100%" src={block} alt="Card image cap" />
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    erole: state.auth.erole
  });
  
export default connect(mapStateToProps,null)(UserButtons);

