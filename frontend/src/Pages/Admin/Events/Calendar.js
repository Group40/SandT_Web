import React, { Component } from 'react'
import axios from "axios";
import {Container, Spinner} from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import AdminNav from "../../../Components/AdminNav.component";
import EditEventCalendar from "./EditEventCalendar";
var events; 

export default class Calendar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            EventList: [],
            loading: true,
            clicked: false,
            clickedId: "",
            clickedTitle: "",
            clickedDate: ""
        }
    }

    componentDidMount = async () => {
        await axios.get("http://localhost:8080/findAllEvents")
        .then(res => {
            events = res.data.map(event => ({ 
                id: event.id,
                title: event.name, 
                date: event.date   
            }));
            this.setState({ 
                EventList: res.data,
                loading: false 
            });
        })  
    }

    handleEventClick = (info) => { 
        this.setState({ 
            clicked: true,
            clickedId: info.event.id,
            clickedTitle: info.event.title,
            clickedDate: info.event.date,
            loading: false 
        });
    }
    
    render() {   
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
        else if (this.state.clicked){
            return(
                <React.Fragment>
                    <EditEventCalendar 
                        id={this.state.clickedId}
                        name={this.state.clickedTitle}
                        date={this.state.clickedDate}
                    />
                </React.Fragment>
            )
        }   
        return (   
            <React.Fragment>
            <AdminNav/>      
            <Container fluid={true}>
                <div style={{ marginTop: "20px" }}>
                <FullCalendar
                    plugins={[ dayGridPlugin ,interactionPlugin ]}
                    eventClick={this.handleEventClick}
                    eventColor="#17a2b8"
                    initialView="dayGridMonth"
                    weekends={true}
                    events={events}
                />
                </div>
            </Container>        
            </React.Fragment>
        )  
    }  
}


