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
            startTime: ""
        }
    }
    
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

   deleteForum(id, e) {
       e.preventDefault();

       axios.delete("http://localhost:8080/deleteForum/" +id)
       .then(res => {
           console.log(res);
           console.log(res.data);

           const forums = this.state.forums.filter(item => item.id == id);
           this.setState({forums});
       })
   }

    renderForums() {
        return this.state.forums.map((forum, index) => {
            const {id, title, date, startDate, startTime} = forum
            return (
                <tr key={id}>
                    <td>{title}</td>
                    <td>{date}</td>
                    <td>{startDate}</td>
                    <td>{startTime}</td>
                    <td><button onClick={null}>Start</button></td>
                    <td><button onClick={null}>Stop</button></td>
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

