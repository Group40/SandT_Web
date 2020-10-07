import React, { Component } from "react";
import { Container, Row, Col,  Card,  CardImg } from 'reactstrap';
import {Link} from 'react-router-dom';
import AdminNav from "../../../Components/AdminNav.component";
import uploadpic from '../../../Images/Gallery/uploadpic.jpg';
import reviewpic from '../../../Images/Gallery/reviewpic.jpg';
import gallery from '../../../Images/Gallery/gallery.jpg';
import myuploads from '../../../Images/Gallery/myuploads.jpg';
import { connect } from 'react-redux';

class PhotoManagement extends Component {

    render(){
        return (
            <section>
                <React.Fragment>
                    <AdminNav/>

                    <Container>

                            <Row>
                                <Col xs="12" sm="3">
                                    <div>
                                        <div className="center">
                                            <Link to='/admin/reviewpics'>
                                                <Card outline color="info">
                                                    <CardImg top width="100%" src={reviewpic} alt="Card image cap" />
                                                </Card>
                                            </Link>
                                        </div>
                                    </div>
                                </Col>

                                <Col xs="12" sm="3">
                                    <div>
                                        <div className="center">
                                            <Link to='/admin/uploadpic'>
                                                <Card outline color="info">
                                                    <CardImg top width="100%" src={gallery} alt="Card image cap" />
                                                </Card>
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs="12" sm="3">
                                    <div>
                                        <div className="center">
                                            <Link to='/admin/adminpics'>
                                                <Card outline color="info">
                                                    <CardImg top width="100%" src={myuploads} alt="Card image cap" />
                                                </Card>
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs="12" sm="3">
                                    <div>
                                        <div className="center">
                                            <Link to='/admin/uploadnewpic'>
                                                <Card outline color="info">
                                                    <CardImg top width="100%" src={uploadpic} alt="Card image cap" />
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

export default connect(mapStateToProps,null)(PhotoManagement);

