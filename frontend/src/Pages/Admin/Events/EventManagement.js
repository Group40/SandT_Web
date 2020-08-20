import React, { Component } from "react";
import { Container, Row, Col,  Card,  CardImg } from 'reactstrap';
import {Link} from 'react-router-dom';
import AdminNav from "../../../Components/AdminNav.component";
import list from '../../../Images/eventlist.png';
import calendar from '../../../Images/calendar.png';
import addevent from '../../../Images/addevents.png';
import { connect } from 'react-redux';

class EventManagement extends Component {
     
    render(){
        return (
            <section>
            <React.Fragment>
                <AdminNav/>
                
                <Container>
                    
                    {(this.props.erole === '3')
                    ?
                    <Row>
                        <Col xs="12" sm="4">
                            <div>
                                <div className="center">
                                    <Link to='/admin/eventlist'>
                                        <Card outline color="info">
                                            <CardImg top width="100%" src={list} alt="Card image cap" />
                                        </Card>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col xs="12" sm="4">
                            <div>
                                <div className="center">
                                    <Link to='/admin/eventcalendar'>
                                        <Card outline color="info">
                                            <CardImg top width="100%" src={calendar} alt="Card image cap" />
                                        </Card>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col xs="12" sm="4">
                            <div>
                                <div className="center">
                                    <Link to='/admin/addevents'>
                                        <Card outline color="info">
                                            <CardImg top width="100%" src={addevent} alt="Card image cap" />
                                        </Card>
                                    </Link>
                                </div>
                            </div>
                        </Col> 
                    </Row>
                    :
                    <Row>
                        <Col xs="12" sm="4">
                            <div>
                                <div className="center">
                                    <Link to='/crew/eventlist'>
                                        <Card outline color="info">
                                            <CardImg top width="100%" src={list} alt="Card image cap" />
                                        </Card>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col xs="12" sm="4">
                            <div>
                                <div className="center">
                                    <Link to='/crew/eventcalendar'>
                                        <Card outline color="info">
                                            <CardImg top width="100%" src={calendar} alt="Card image cap" />
                                        </Card>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col xs="12" sm="4">
                            <div>
                                <div className="center">
                                    <Link to='/crew/addevents'>
                                        <Card outline color="info">
                                            <CardImg top width="100%" src={addevent} alt="Card image cap" />
                                        </Card>
                                    </Link>
                                </div>
                            </div>
                        </Col> 
                    </Row>
                    }
                    
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
  
export default connect(mapStateToProps,null)(EventManagement);

