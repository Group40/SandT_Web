import React, { Component, useState } from 'react';
import AdminNav from "../../../Components/AdminNav.component";
import { Table, Button, TableHeader, TableBody, TableRow, TableCell } from 'semantic-ui-react';
import axios from 'axios';
var forums;

export default class ViewForums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forums: [],
            id: "",
            title: "",
            date: "",
            startDate: "",
            startTime: "",
            status: ""
        }
        // this.startForum = this.startForum.bind(this);
    }
    
    //get data
    componentDidMount = async() => {
       await axios.get("http://localhost:8080/getForums") 
       .then(res => {
            forums = res.data.map(forum => ({
                id: forum.id,
                title: forum.title,
                date: forum.date,
                startDate: forum.startDate,
                startTime: forum.startTime,
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
                            startDate: forum.startDate,
                            startTime: forum.startTime,
                            status: forum.status
                        }));
                        this.setState({
                            forums: res.data
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
                        startDate: forum.startDate,
                        startTime: forum.startTime,
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

    // first render
    renderForums() {
        return this.state.forums.map((forum, index) => {
            const {id, title, date, startDate, startTime, status} = forum
            return (
                <tr key={id}>
                    {/* <td>{id}</td> */}
                    <td>{title}</td>
                    <td>{date}</td>
                    {/* <td>{status}</td> */}
                    <td>
                    
                        {(status=="0")?
                            <button onClick={() => this.start(id)}>start</button>
                        :
                        (status=="1")?<button onClick={() => this.stop(id)}>end</button>:<p>over</p>
                            
                        }
                    </td>

                    <td>
                    
                    {(status=="0")?
                        <Button onClick={(e) => this.deleteForum(id, status, e)}>Delete</Button>
                    :
                    
                        <Button disabled>Delete</Button>
                    }
                    </td>
                    {/* <td><Button onClick={(e) => this.deleteForum(id, status, e)}>Delete</Button></td> */}
                </tr>
            )
        })
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
                <Table >
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>Title</th>
                            <th>Date</th>
                            {/* <th>Status</th>  */}
                            <th>Start/End</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderForums()}

                    </tbody>
                </Table>
            </React.Fragment>
        );
    }

}



