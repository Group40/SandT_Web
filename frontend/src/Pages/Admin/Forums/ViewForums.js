import React, { Component, useState } from 'react';
import AdminNav from "../../../Components/AdminNav.component";
import { Table, Button, Container, Label, } from 'semantic-ui-react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import { actions } from 'react-redux-form';
// import { result } from 'lodash';
var forums;

export default class ViewForums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forums: [],
            id: "",
            title: "",
            date: "",
            status: "",
            startmodal: false,
            stopmodal: false,
            deletemodal: false,
        }

    }

    //get data
    componentDidMount = async() => {
       await axios.get("http://localhost:8080/getForums") 
       .then(res => {
            forums = res.data.map(forum => ({
                id: forum.id,
                title: forum.title,
                date: forum.date,
                status: forum.status
            }));
            this.setState({
                forums: res.data
            });
        })
    }

    start(id) {
        console.log("Started forum : "+id);
        axios.post("http://localhost:8080/sendForumID/" +id)
            .then(response => {
                axios.get("http://localhost:8080/getForums") 
                    .then(res => {
                        forums = res.data.map(forum => ({
                            id: forum.id,
                            title: forum.title,
                            date: forum.date,
                            status: forum.status
                        }));
                        this.setState({
                            forums: res.data,
                        });
                    })
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
            })
        
    };

    stop(id) {
        console.log("Forum ended : "+id);
        axios.post("http://localhost:8080/endForumID/" +id)
        .then(response => {
            axios.get("http://localhost:8080/getForums") 
                .then(res => {
                    forums = res.data.map(forum => ({
                        id: forum.id,
                        title: forum.title,
                        date: forum.date,
                        status: forum.status
                    }));
                    this.setState({
                        forums: res.data
                    });
                })
            console.log(response);
        }).catch((error) => {
            console.log(error);
            }
        )
    };

    starttoggle = (id) => {
        this.setState({
            startmodal: !this.state.startmodal,
            id: id,  
        });
    };

    stoptoggle = (id) => {
        this.setState({
            stopmodal: !this.state.stopmodal,
            id: id,  
        });
    };

    deletetoggle = (id, status) => {
        this.setState({
            deletemodal: !this.state.deletemodal,
            id: id, 
            status: status, 
        });
    };

    // first render
    renderForums() {
        return this.state.forums.map((forum, index) => {
            const {id, title, date, status} = forum
            return (
                // <Table.Body>
                    <Table.Row key={id}>
                        <Table.Cell>{title}</Table.Cell>
                        <Table.Cell>{date}</Table.Cell>
                        <Table.Cell>
                            {(status==="0")?
                                <Button color="green" onClick={() => this.starttoggle(id)}>Start</Button>
                            :
                                (status==="1")?<Button color="blue" onClick={() => this.stoptoggle(id)}>End</Button>:<Label>Over</Label>
                            
                            }
                        </Table.Cell>
                        <Table.Cell>
                            {(status==="0")?

                                <Button color="red" onClick={() => this.deletetoggle(id, status)}>Delete</Button>
                            :
                    
                            <Button disabled>Delete</Button>
                            }
                        </Table.Cell>
                    </Table.Row>
        )})
    }

    //delete button
    deleteForum(id, status, e) {
        e.preventDefault();
        if(status == '0') {
            axios.delete("http://localhost:8080/deleteForum/" +id)
            .then(res => {
                console.log(res);
                console.log(res.data);
                let forums = this.state.forums.filter(item => item.id !== id);
                this.setState({forums});
            });
        }else {
            console.log("Forum has already started");
        }
         
    }

    render(forums, index) {
        return (
            <React.Fragment>
                <AdminNav/>
                { this.state.startmodal ?
                    <Modal isOpen={this.state.startmodal} toggle={this.starttoggle}>
                        <ModalHeader toggle={this.starttoggle}>Confirm</ModalHeader>
                        <ModalBody>
                            Are you sure you want to start this forum?
                        </ModalBody>
                        <div >
                            <ModalFooter>
                                <Button color="red" onClick={() => this.start(this.state.id)} >Yes</Button>
                                <Button color="blue" onClick={this.starttoggle} >No</Button>
                            </ModalFooter>
                        </div>
                    </Modal>
                    : null }

                    { this.state.stopmodal ?
                    <Modal isOpen={this.state.stopmodal} toggle={this.stoptoggle}>
                        <ModalHeader toggle={this.stoptoggle}>Confirm</ModalHeader>
                        <ModalBody>
                            Are you sure you want to end this forum?
                        </ModalBody>
                        <div >
                            <ModalFooter>
                                <Button color="red" onClick={() => this.stop(this.state.id)} >Yes</Button>
                                <Button color="blue" onClick={this.stoptoggle} >No</Button>
                            </ModalFooter>
                        </div>
                    </Modal>
                    : null } 

                    { this.state.deletemodal ?
                    <Modal isOpen={this.state.deletemodal} toggle={this.deletetoggle}>
                        <ModalHeader toggle={this.deletetoggle}>Confirm</ModalHeader>
                        <ModalBody>
                            Are you sure you want to delete this forum?
                        </ModalBody>
                        <div >
                            <ModalFooter>
                                <Button color="red" onClick={(e) => this.deleteForum(this.state.id, this.state.status, e)} >Yes</Button>
                                <Button color="blue" onClick={this.deletetoggle} >No</Button>
                            </ModalFooter>
                        </div>
                    </Modal>
                    : null } 

                <Container className='center'>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Start/End</Table.HeaderCell>
                            <Table.HeaderCell>Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderForums()}
                    </Table.Body>
                </Table>
                </Container>
            </React.Fragment>
        );
    }

}



