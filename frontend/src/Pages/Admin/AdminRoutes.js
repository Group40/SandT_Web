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
import UploadPics from "./Photography/Upload/UploadPic"
import ViewGallery from "./Photography/GlobalGallery/ViewGallery"
import CourseManagement from "./Courses/CourseManagement";
import AddCourses from "./Courses/AddCourses";
import CourseList from "./Courses/CourseList";
import EditCourse from "./Courses/EditCourse";
import Notification from "./Notification";
import UserMember from "./UserManagement/UserMember";
import CrewMember from "./UserManagement/CrewMember";
import AdminMember from "./UserManagement/AdminMember";
import AllMember from "./UserManagement/AllMember";
import BlockMember from "./UserManagement/BlockMember";
import UserButtons from "./UserManagement/UserButtons";
import OpticsManagement from "./Optics/OpticsManagement";
import AddOptics from "./Optics/AddNew/AddOptics";
import ViewOptics from "./Optics/AddNew/ViewOptics";
import Photography from "./Photography/PhotoManagement";
import EditHomeScreenScroll from "./AppHomeScreen/EditHomeScreenScroll";
import Forums from "./Forums/Forums";
import AddForum from "./Forums/AddForum";
import ViewForums from "./Forums/ViewForums";

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
                <Route path="/admin/reviewpics" component={ReviewPics}/>
                <Route path="/admin/uploadpic" component={ViewGallery}/>
                <Route path="/admin/adminpics" component={MyPics}/>
                <Route path="/admin/uploadnewpic" component={UploadPics}/>
                <Route path="/admin/editmypic/:id" component={EditMyPic}/>
                <Route path="/admin/coursemanagement" component={CourseManagement}/>
                <Route path="/admin/addcourses" component={AddCourses}/>
                <Route path="/admin/courselist" component={CourseList}/>
                <Route path="/admin/editcourse/:id" component={EditCourse}/>
                <Route path="/admin/notifications" component={Notification}/>
                <Route path="/admin/usermanagement" component={UserButtons}/>
                <Route path="/admin/viewadminmember" component={AdminMember}/>
                <Route path="/admin/viewcrewmember" component={CrewMember}/>
                <Route path="/admin/viewusermember" component={UserMember}/>
                <Route path="/admin/viewallmember" component={AllMember}/>
                <Route path="/admin/viewblockmember" component={BlockMember}/>
                <Route path="/admin/optics" component={OpticsManagement}/>
                <Route path="/admin/addoptics" component={AddOptics}/>
                <Route path="/admin/viewoptics" component={ViewOptics}/>
                <Route path="/admin/photomanagement" component={Photography}/>
                <Route path="/admin/scroll" component={EditHomeScreenScroll}/>
                <Route path="/admin/forums" component={Forums}/>
                    <Route path="/admin/addforum" component={AddForum}/>
                    <Route path="/admin/viewforums" component={ViewForums}/>
            </Router>
            
        );
    }
}