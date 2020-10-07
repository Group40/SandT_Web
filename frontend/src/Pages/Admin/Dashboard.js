import React, { Component } from "react";
import AdminNav from "../../Components/AdminNav.component";
import { connect } from 'react-redux';
import { Container, Navbar, NavbarBrand, Row, Col, Button } from 'reactstrap';
import Logo from "../../Images/logo.jpg";
import CarouselSlide from "./Carousel";

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                {(this.props.isAuthenticated === true && (this.props.erole === '3' || this.props.erole === '2')) ? 
                <React.Fragment>
                    <AdminNav/>
                    <Row>
                    <Col xs="12" sm="2">
                            <Container className="center">    
                            </Container>   
                        </Col>
                        <Col xs="12" sm="8">
                            <Container className="center">
                                <div>
                                    <div className="center">
                                        <center>
                                        <img src={Logo} alt="S & T Group Admin Dashboard" style={{justifyContent: 'center',alignItems: 'center',}}/>
                                        <h1>S & T Group</h1>
                                        <h2  style={{color: "#39a7d2"}}>Mobile app control panel | Web dashboard</h2>
                                        <h4 style={{color: "grey"}}>Mission: Create highly knowledgeable astronomy population in Sri Lanka.</h4> 
                                        <h4 style={{color: "grey"}}>About: Leading Astronomy and science publisher in Sri Lanka publishing most of Science Fictions by Sir Arthur C. Clarke.</h4>
                                        <h4 style={{color: "grey"}}>Company Overview: S & T Group was established in 2002 and so far we have published plenty of astronomy products including books, maps, CDs and science fictions. We always try to introduce new experience to our readers enhancing their interest in Astronomy while improving the knowledge. You can travel through whole universe via our products; they include the products about solar system, deep sky, practical astronomy, Space exploration and UFOs.</h4>
                                        </center>
                                    </div>
                                </div>
                            </Container>   
                        </Col>
                        <Col xs="12" sm="2">
                            <Container className="center">    
                            </Container>   
                        </Col>
                    </Row>
                    <Container>
                        <Row>
                            <Col xs="12" sm="7">
                                <Container className="center">
                                    <CarouselSlide/>
                                </Container>   
                            </Col>
                            <Col xs="2" sm="1">
                                <div className="center">
                                </div>  
                            </Col>
                            <Col  xs="10" sm="4">
                                <div className="center">
                                    <Button  outline color="info" type="submit" block href="https://www.facebook.com/sandtgrouplk/">S & T Group Facebook Page</Button>
                                    <Button  outline color="info" type="submit" block href="https://www.facebook.com/ioasl/">Institute of Astronomy Facebook Page</Button> 
                                    <Button  outline color="info" type="submit" block href="https://www.facebook.com/Tharulowa/">Tharulowa Facebook Page</Button>
                                    <Button  outline color="info" type="submit" block href="https://www.facebook.com/groups/305576446447568">S & T Facebook Group</Button> 
                                    <Button  outline color="info" type="submit" block href="https://www.facebook.com/AstrophiliaByIOAS">Astrophilia Facebook Page</Button> 
                                    <Button  outline color="primary" type="submit" block href="https://www.linkedin.com/company/institute-of-astronomy-sri-lanka/">Institute of Astronomy LinkedIn Profile</Button>
                                    <Button  outline color="danger" type="submit" block href="https://www.youtube.com/channel/UCItfy-Tr7weE8d0Zq9eNdEg">Tharulowa Digital Youtube Channel</Button>  
                                </div>
                            </Col>
                        </Row> 
                    </Container>
                    <br/><br/><br/>
                    <Navbar color="info" light>
                        <NavbarBrand className="mr-auto"><center><h6 style={{color: "white"}}>© 2020 Group 40. All Rights Reserved.</h6></center></NavbarBrand>
                    </Navbar>
                </React.Fragment>
                : null}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    erole: state.auth.erole
  });
  
export default connect(mapStateToProps,null)(Dashboard);
