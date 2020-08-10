import React, { Component } from 'react'
import axios from "axios";
import { Table, Spinner, Container, Row, Form, FormGroup, Button, Label, Col } from "reactstrap";
import AdminNav from "../../Components/AdminNav.component";
import DatePicker from 'reactstrap-date-picker';

export default class Notification extends Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            CourseList: [],
            loading: true,
            filterDate: ""
        }
    }

    componentDidMount = async () => {
        await axios.get("http://localhost:8080/findAllNotifications")
        .then(res => {
            this.setState({ 
                NotificationList: res.data.reverse(),
                loading: false
            })
        }) 
    }

    onChangeDate(value){
        this.setState({
            dateValue: value,
        });   
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });    
    };

    reset = e => {
        this.setState({
            filterDate: ""
        });
        document.getElementById("form").reset();
    };

    onSubmit(e) {
        e.preventDefault();
        this.setState({ 
            filterDate: document.getElementById("datepicker").value.substring(0, 10)
        });
    }

    render() { 
        const filterDate = this.state.filterDate;
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
                <AdminNav/> 
                <Container>
                    <Row>
                        <Form id="form" onSubmit={this.onSubmit}>
                            <Row>
                                <Col>
                                <FormGroup>
                                    <Label for="date">Date</Label>
                                    <DatePicker id="datepicker" value={this.state.dateValue}  onChange={(v) => this.onChangeDate(v)}/>
                                </FormGroup>
                                </Col>
                                <Col>
                                    <Button outline color="info" type="submit" length="100" block>Set Filters</Button>
                                </Col>
                                <Col>
                                    <Button outline color="info" onClick={this.reset} length="100" block>Reset</Button>
                                </Col>
                                <Col>
                                    {this.state.filterDate}
                                </Col>
                            </Row> 
                        </Form>
                    </Row>
                    <Row>
                        <div style={{ marginTop: "20px" }}>
                            <Table>
                                {this.state.NotificationList.map(function(notification, index) {
                                    if(filterDate === ""){
                                        return (
                                            <React.Fragment key={index}> 
                                                <tr>
                                                    <td>  
                                                        {(notification.authorType === "3")
                                                            ?
                                                            //Admin----------------------------------------------
                                                            (notification.eventDate == null)
                                                                ?
                                                                //Course
                                                                notification.authorName +
                                                                " who has access as an admin " +
                                                                notification.nameType +
                                                                " '" +
                                                                notification.name +
                                                                "' from " +
                                                                notification.authorMail +
                                                                " on " +
                                                                notification.date.substring(0, 10) +
                                                                " at " +
                                                                notification.date.substring(11, 20)
                                                                :
                                                                //Event
                                                                notification.authorName +
                                                                " who has access as an admin " +
                                                                notification.nameType +
                                                                " '" +
                                                                notification.name +
                                                                "' (event date : " +
                                                                notification.eventDate +
                                                                ") from " +
                                                                notification.authorMail +
                                                                " on " +
                                                                notification.date.substring(0, 10) +
                                                                " at " +
                                                                notification.date.substring(11, 20)
                                                            :
                                                            //Crew Member----------------------------------------
                                                            (notification.eventDate == null)
                                                                ?
                                                                //Course
                                                                notification.authorName +
                                                                " who has access as a crew member " +
                                                                notification.nameType +
                                                                " '" +
                                                                notification.name +
                                                                "' (event date : " +
                                                                notification.eventDate +
                                                                ") from " +
                                                                notification.authorMail +
                                                                " on " +
                                                                notification.date.substring(0, 10) +
                                                                " at " +
                                                                notification.date.substring(11, 20)
                                                                :
                                                                //Event
                                                                notification.authorName +
                                                                " who has access as a crew member " +
                                                                notification.nameType +
                                                                " '" +
                                                                notification.name +
                                                                "' (event date : " +
                                                                notification.eventDate +
                                                                ") from " +
                                                                notification.authorMail +
                                                                " on " +
                                                                notification.date.substring(0, 10) +
                                                                " at " +
                                                                notification.date.substring(11, 20)
                                                        } 
                                                    </td> 
                                                </tr>     
                                            </React.Fragment>
                                        );
                                    }
                                    else{
                                        if(filterDate === notification.date.substring(0, 10)){
                                            return (
                                                <React.Fragment key={index}>  
                                                    <tr>
                                                        <td>
                                                            {(notification.authorType === "3")
                                                                ?
                                                                //Admin----------------------------------------------
                                                                (notification.eventDate == null)
                                                                    ?
                                                                    //Course
                                                                    notification.authorName +
                                                                    " who has access as an admin " +
                                                                    notification.nameType +
                                                                    " '" +
                                                                    notification.name +
                                                                    "' from " +
                                                                    notification.authorMail +
                                                                    " on " +
                                                                    notification.date.substring(0, 10) +
                                                                    " at " +
                                                                    notification.date.substring(11, 20)
                                                                    :
                                                                    //Event
                                                                    notification.authorName +
                                                                    " who has access as an admin " +
                                                                    notification.nameType +
                                                                    " '" +
                                                                    notification.name +
                                                                    "' (event date : " +
                                                                    notification.eventDate +
                                                                    ") from " +
                                                                    notification.authorMail +
                                                                    " on " +
                                                                    notification.date.substring(0, 10) +
                                                                    " at " +
                                                                    notification.date.substring(11, 20)
                                                                :
                                                                //Crew Member----------------------------------------
                                                                (notification.eventDate == null)
                                                                    ?
                                                                    //Course
                                                                    notification.authorName +
                                                                    " who has access as a crew member " +
                                                                    notification.nameType +
                                                                    " '" +
                                                                    notification.name +
                                                                    "' (event date : " +
                                                                    notification.eventDate +
                                                                    ") from " +
                                                                    notification.authorMail +
                                                                    " on " +
                                                                    notification.date.substring(0, 10) +
                                                                    " at " +
                                                                    notification.date.substring(11, 20)
                                                                    :
                                                                    //Event
                                                                    notification.authorName +
                                                                    " who has access as a crew member " +
                                                                    notification.nameType +
                                                                    " '" +
                                                                    notification.name +
                                                                    "' (event date : " +
                                                                    notification.eventDate +
                                                                    ") from " +
                                                                    notification.authorMail +
                                                                    " on " +
                                                                    notification.date.substring(0, 10) +
                                                                    " at " +
                                                                    notification.date.substring(11, 20)
                                                            }
                                                        </td>
                                                    </tr>       
                                                </React.Fragment>
                                            );
                                        }
                                        else{
                                            return null;
                                        }
                                    }  
                                })}  
                            </Table>         
                        </div>  
                    </Row>
                </Container>        
            </React.Fragment>
        )  
    }
}
