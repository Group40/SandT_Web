import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import AddEvents from "./Events/AddEvents";
import EditEvent from "./Events/EditEvent";
import EventList from "./Events/EventList";
import Calendar from "./Events/Calendar";
import RequestList from "./Events/RequestList";
import ConfirmedList from "./Events/ConfirmedList";
import RejectRequest from "./Events/RejectRequest";
import ConfirmRequest from "./Events/ConfirmRequest";
import EventManagement from "./Events/EventManagement";
import CourseManagement from "./Courses/CourseManagement";
import AddCourses from "./Courses/AddCourses";
import CourseList from "./Courses/CourseList";
import EditCourse from "./Courses/EditCourse";

export default class AdminRoutes extends Component {

    render() {
        return (
            <Router>
                <Route path="/admin/dashboard" component={Dashboard}/>
                <Route path="/admin/addevents" component={AddEvents}/>
                <Route path="/admin/eventlist" component={EventList}/>
                <Route path="/admin/editevent/:id" component={EditEvent}/>
                <Route path="/admin/requestlist/:id" component={RequestList}/>
                <Route path="/admin/confirmedlist/:id" component={ConfirmedList}/>
                <Route path="/admin/rejectrequest/:id" component={RejectRequest}/>
                <Route path="/admin/confirmrequest/:id" component={ConfirmRequest}/>
                <Route path="/admin/eventcalendar" component={Calendar}/>
                <Route path="/admin/eventmanagement" component={EventManagement}/>
                <Route path="/admin/coursemanagement" component={CourseManagement}/>
                <Route path="/admin/addcourses" component={AddCourses}/>
                <Route path="/admin/courselist" component={CourseList}/>
                <Route path="/admin/editcourse/:id" component={EditCourse}/>
            </Router>
            
        );
    }
}