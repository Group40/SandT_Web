import React, {Component} from "react";
import AdminNav from "../../../Components/AdminNav.component";
import { Image, Container, Grid } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import dark from '../../../Images/Forums/dark-blue.png';
import light from '../../../Images/Forums/light-blue.png';
import { connect } from 'react-redux';

class ForumManagement extends Component {

    render() {
        return(
            <section>
                <React.Fragment>
                    <AdminNav/>
                        <Container className='center'>
                            <Grid.Row class='center'>
                                <Grid.Column className='center'>
                                <div class="ui four column grid">
                                <div class="column">
                                    <Link to='/admin/addforum'>
                                        <div class="ui fluid card">
                                            <div class="image">
                                                <Image src={dark} alt="Card image cap"/>
                                            </div>
                                            <div class="content">
                                                <a class="header">Add Forums</a>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div class="column">
                                    <Link to='/admin/viewforums'>
                                        <div class="ui fluid card">
                                            <div class="image">
                                                <img src={light} alt="Card image cap"/>
                                            </div>
                                            <div class="content">
                                                <a class="header">View Forums</a>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                                </Grid.Column>
                            
                            </Grid.Row>
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
  
export default connect(mapStateToProps,null)(ForumManagement);
