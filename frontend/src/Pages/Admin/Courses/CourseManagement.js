import React, { Component } from "react";
import { Container, Row, Col,  Card,  CardImg } from 'reactstrap';
import {Link} from 'react-router-dom';
import AdminNav from "../../../Components/AdminNav.component";
import list from '../../../Images/courselist.png';
import addcourse from '../../../Images/addcourses.png';
import { connect } from 'react-redux';

class CourseManagement extends Component {
     
    render(){
        return (
            <section>
            <React.Fragment>
                <AdminNav/>
                
                <Container>
                {(this.props.erole === '3') 
                ?
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
                :
                    <Row>
                        <Col xs="12" sm="6">
                            <div>
                                <div className="center">
                                    <Link to='/crew/courselist'>
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
                                    <Link to='/crew/addcourses'>
                                        <Card outline color="info">
                                            <CardImg top width="100%" src={addcourse} alt="Card image cap" />
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
    erole: state.auth.erole,
    username: state.auth.username
});
  
export default connect(mapStateToProps,null)(CourseManagement);

