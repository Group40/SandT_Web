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
import ReviewPics from "./Photography/Review/ReviewPics"
import MyPics from "./Photography/MyGallery/MyPics";
import EditMyPic from "./Photography/MyGallery/EditMyPic";
//import UploadPics from "./Photography/UploadPic"
import ViewGallery from "./Photography/GlobalGallery/ViewGallery"
import CourseManagement from "./Courses/CourseManagement";
import AddCourses from "./Courses/AddCourses";
import CourseList from "./Courses/CourseList";
import EditCourse from "./Courses/EditCourse";
import Notification from "./Notification";
import Photography from "./Photography/PhotoManagement";

export default class CrewRoutes extends Component {

    render() {
        return (
            <Router>
                <Route path="/crew/dashboard" component={Dashboard}/>
                <Route path="/crew/addevents" component={AddEvents}/>
                <Route path="/crew/eventlist" component={EventList}/>
                <Route path="/crew/editevent/:id" component={EditEvent}/>
                <Route path="/crew/requestlist/:id" component={RequestList}/>
                <Route path="/crew/confirmedlist/:id" component={ConfirmedList}/>
                <Route path="/crew/rejectrequest/:id" component={RejectRequest}/>
                <Route path="/crew/confirmrequest/:id" component={ConfirmRequest}/>
                <Route path="/crew/eventcalendar" component={Calendar}/>
                <Route path="/crew/eventmanagement" component={EventManagement}/>
                <Route path="/crew/reviewpics" component={ReviewPics}/>
                <Route path="/crew/uploadpic" component={ViewGallery}/>
                <Route path="/crew/adminpics" component={MyPics}/>
                <Route path="/crew/editmypic/:id" component={EditMyPic}/>
                <Route path="/crew/coursemanagement" component={CourseManagement}/>
                <Route path="/crew/addcourses" component={AddCourses}/>
                <Route path="/crew/courselist" component={CourseList}/>
                <Route path="/crew/editcourse/:id" component={EditCourse}/>
                <Route path="/crew/notifications" component={Notification}/>
                <Route path="/crew/photomanagement" component={Photography}/>
            </Router>
            
        );
    }
}