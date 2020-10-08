import React, { Component } from 'react'
import axios from "axios";
import {Table, Spinner, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import AdminNav from "../../../Components/AdminNav.component";
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {   faUserCircle, faEnvelope, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import {Divider, Grid, Search} from "semantic-ui-react";
import _ from "lodash";

const backendURI = require("../../../BackEndURI");

class UserMember extends Component {

    constructor(props) {
        super(props)
        this.state = {
            UserList: [],
            loading: true,
            modal:false,
            modalblk:false,
            fname:"",
            lname:"",
            id:"",
            isUnreviewing: false,
            isSearchLoading:false,
            value:"",
            title:"",
        }
    }

    componentDidMount = async () => {
        if(this.state.value==="")
        {
            await axios.get(backendURI.url+"/userdata/finduser")
                .then(res => {
                    this.setState({
                        UserList: res.data,
                        loading: false
                    })
                })
        }
        else
        {
            await axios.get(backendURI.url+"/userdata/searchuser/"+this.state.value)
                .then(res => {
                    this.setState({
                        UserList: res.data,
                        loading: false
                    })
                })
        }

    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isSearchLoading: true, value })
        setTimeout(() => {
            //const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            //const isMatch = (result) => re.test(result.title)

            this.setState({
                    isSearchLoading: false,
                    //results: _.filter(this.source, isMatch),
                },
                () =>{
                    this.componentDidMount()
                }
            )
        }, 300)
    }
    handleResultSelect = (e, { result }) => this.setState(
        {
            value: result.title
        },() =>{
            this.componentDidMount()
        })

    toggle = (id,fname,lname) => {
        this.setState({
            modal: !this.state.modal,
            id: id,
            fname:fname,
            lname:lname,
        });
    };
    blocktoggle = (id,fname,lname) => {
        this.setState({
            modalblk: !this.state.modalblk,
            id: id,
            fname:fname,
            lname:lname,
        });
    };

    Submit = async() => {
        // const obj3 = {
        //     authorName: this.props.username+" "+this.props.lname,
        //     authorType: this.props.erole,
        //     authorMail: this.props.email,
        //     name: this.state.fname,
        //     nameType: "unrated admin",
        //     date: localISOTime,
        // };
        const reqbody = {
            id:this.state.id
        }
        this.setState({ isUnreviewing: true });
        this.toggle()
        await axios.put(backendURI.url+"/userupdate/tocrew",(reqbody))
            .then(res => {
                this.setState({
                    isUnreviewing: false,
                });
                this.componentDidMount()
            })
    }

    Submitblk = async() => {
        const reqbody = {
            id:this.state.id
        }
        this.setState({ isUnreviewing: true });
        this.blocktoggle()
        await axios.put(backendURI.url+"/userupdate/toblock",(reqbody))
            .then(res => {
                this.setState({
                    isUnreviewing: false,
                });
                this.componentDidMount()
            })
    }

    render() {
        const {
            isSearchLoading,
            value,
            results,
        } = this.state
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
                { this.state.modal ?
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Confirm</ModalHeader>
                        <ModalBody>
                            Are you sure you want to make {this.state.fname} {this.state.lname} a Crew Member ?
                        </ModalBody>
                        <div >
                            <ModalFooter>
                                <Button color="danger" onClick={() => this.Submit()} >Yes</Button>
                                <Button color="primary" onClick={this.toggle} >No</Button>
                            </ModalFooter>
                        </div>
                    </Modal>
                    : null }

                { this.state.modalblk ?
                    <Modal isOpen={this.state.modalblk} toggle={this.blocktoggle}>
                        <ModalHeader toggle={this.blocktoggle}>Confirm</ModalHeader>
                        <ModalBody>
                            Are you sure you want to block {this.state.fname} {this.state.lname} ?
                        </ModalBody>
                        <div >
                            <ModalFooter>
                                <Button color="danger" onClick={() => this.Submitblk()} >Yes</Button>
                                <Button color="primary" onClick={this.blocktoggle} >No</Button>
                            </ModalFooter>
                        </div>
                    </Modal>
                    : null }

                <AdminNav/>
                <Container style={{ margin: 20 }}>
                    <div className="right">
                        <Grid>
                            <Grid.Column width={6}>
                                <Search
                                    loading={isSearchLoading}
                                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                        leading: true,
                                    })}
                                    results={results}
                                    onResultSelect={this.handleResultSelect}
                                    value={value}
                                    showNoResults={false}
                                />
                            </Grid.Column>
                        </Grid>
                        <Divider hidden />
                    </div>
                    <Divider hidden />
                    <Divider hidden />
                    <Divider hidden />
                </Container>
                <Container>
                    <div className="setmiddle">
                        <h1>
                            <center>All Users</center>
                        </h1>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <Table>
                            <tbody>
                            <tr>
                                <td> User Name</td>
                                <td> Email</td>
                                <td> Registered Date</td>
                                <td></td>
                                <td></td>
                            </tr>
                            {this.state.UserList.map((UserMember, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td><FontAwesomeIcon icon={faUserCircle}/> {UserMember.username}  {UserMember.lname}</td>

                                            <td><FontAwesomeIcon icon={faEnvelope}/> {UserMember.email}</td>
                                            <td><FontAwesomeIcon icon={faCalendar}/> {UserMember.signupdate}</td>
                                            {/*<td><FontAwesomeIcon icon={faIdCard}/> {AdminMember.urole}</td>*/}

                                            <td> <Button color="primary" onClick={()=>this.toggle(UserMember.id,UserMember.username,UserMember.lname)}>Make Crew</Button>{' '}</td>
                                            <td> <Button color="danger" onClick={()=>this.blocktoggle(UserMember.id,UserMember.username,UserMember.lname)}>Block User</Button>{' '}</td>


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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    erole: state.auth.erole,
    username: state.auth.username,
    email: state.auth.email
});

export default connect(mapStateToProps,null)(UserMember);
