import React, { Component } from "react";
import { Container, Spinner, Row, Col, Alert, Form, FormGroup, Label, Input, Card, CardBody, CardTitle, CardSubtitle, CardText, Button, CardImg, CardDeck, CardFooter } from 'reactstrap';
import {Link} from 'react-router-dom';
import AdminNav from "../../../Components/AdminNav.component";
import list from '../../../Images/eventlist.jpg';
import calendar from '../../../Images/calendar.png';
import addevent from '../../../Images/addevent.jpg';
import Background from '../../../Images/background1.jpg';
var sectionStyle = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${Background})`
};
export default class EventManagement extends Component {
     
    render(){
        return (
            <section style={ sectionStyle }>
            <React.Fragment>
                <AdminNav/>
                
                <Container>
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
                </Container>
               
            </React.Fragment>
            </section>
        );
    }  
}

