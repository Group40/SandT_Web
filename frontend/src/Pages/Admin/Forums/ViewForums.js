import React, { Component } from 'react';
import AdminNav from "../../../Components/AdminNav.component";
import { Table } from 'reactstrap';
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
                startDate: forum.startDate,
                startTime: forum.startTime
            }));
            this.setState({
                forums: res.data
            });
        })
    }

    //add document to firebase collection
    // postEventID(id, e) {
    //     e.preventDefault();
    //     const db = firebase.firestore();
    //     db.collection('messages').add({
    //         eventId: id,
    //         userRole: localStorage.getItem('erole')
    //     });
    //     // this.setState({forums});
    //     console.log("Added event " + id + " and user " + localStorage.getItem('erole') + " to firebase");
    // }

    //send start forum id to bakend
    startForum(id, e) {
    
        e.preventDefault();
        
        axios.post("http://localhost:8080/sendForumID/" +id)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
        this.btn.setAttribute("disabled", "disabled");
    }

    //send end forum id to backend
    endForums(id, e) {
        e.preventDefault();
        
        axios.post("http://localhost:8080/endForumID/" +id)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
        this.btn.setAttribute("disabled", "disabled");
    }

    //delete button
    deleteForum(id, e) {
       e.preventDefault();

       axios.delete("http://localhost:8080/deleteForum/" +id)
       .then(res => {
            console.log(res);
            console.log(res.data);
            let forums = this.state.forums.filter(item => item.id !== id);
            this.setState({forums});
       });
   }

   //first render
    renderForums() {
        return this.state.forums.map((forum, index) => {
            const {id, title, date, startDate, startTime} = forum
            return (
                <tr key={id}>
                    <td>{title}</td>
                    <td>{date}</td>
                    <td>{startDate}</td>
                    <td>{startTime}</td>
                    <td><button onClick={(e) => this.startForum(id, e)} ref={btn => { this.btn = btn; }}>Start</button></td>
                    <td><button onClick={(e) => this.endForums(id, e)} ref={btn => { this.btn = btn; }}>End</button></td>
                    <td><button onClick={(e) => this.deleteForum(id, e)}>Delete</button></td>
                </tr>
            )
        })
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

