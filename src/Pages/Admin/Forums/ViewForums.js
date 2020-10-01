import React, { Component } from 'react';
import AdminNav from "../../../Components/AdminNav.component";
import { Table } from 'reactstrap';
import axios from 'axios';
import SEButton from "./SEButton";
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

    // send start forum id to bakend
    // startForum(id, e) {
        
    //     e.preventDefault();
        
    //     axios.post("http://localhost:8080/sendForumID/" +id)
    //     .then((response) => {
    //         console.log(response);
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    //     this.setState({
    //         isStart: false
    //     });
    //     // this.btn.setAttribute("disabled", "disabled");
    // }


    // //send end forum id to backend
    // endForums(id, e) {
    //     e.preventDefault();
        
    //     axios.post("http://localhost:8080/endForumID/" +id)
    //     .then((response) => {
    //         console.log(response);
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    //     // this.btn.setAttribute("disabled", "disabled");  
    // }

   //first render
    renderForums() {
        return this.state.forums.map((forum, index) => {
            const {id, title, date, startDate, startTime, status} = forum
            return (
                <tr key={id}>
                    <td>{title}</td>
                    <td>{date}</td>
                    <td>{startDate}</td>
                    <td>{startTime}</td>
                    <SEButton color1={"green"} color2="{red}" name1={"Start"} name2={"End"} id={id}/>
                    {/* <td><button ref={btn => {this.btn = btn; }} onClick={this.state.isStart ? (e) => this.startForum(id, e) : (e) => this.endForums(id, e)}>{this.state.isStart ? 'Start' : 'End'}</button></td> */}
                    <td><button onClick={(e) => this.deleteForum(id, status, e)}>Delete</button></td>
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
                <Table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Start date</th>
                            <th>Start time</th> 
                            <th>Actions</th>
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



