import React, { Component } from 'react'
import axios from "axios";
import { Table, Spinner, Container, Row, Form, FormGroup, Button, Col } from "reactstrap";
import AdminNav from "../../Components/AdminNav.component";
import DatePicker from 'reactstrap-date-picker';
import { connect } from 'react-redux';

const backendURI = require("../../BackEndURI");

class Notification extends Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            CourseList: [],
            loading: true,
            filterDate: "",
        }
    }

    componentDidMount = async () => {
        await axios.get(backendURI.url+"/findAllNotifications")
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

    reset = e => {
        this.setState({
            filterDate: ""
        });
        document.getElementById("form").reset();
    };

    onDelete(id){
        this.setState({ loading: true });  
        axios.delete(backendURI.url+"/deleteNotification/"+id)
        .then((res) => {
            axios.get(backendURI.url+"/findAllNotifications")
            .then(res => {
                this.setState({ 
                    NotificationList: res.data.reverse(),
                    loading: false
                })
            })   
        }) 
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
                <br/>
                <Container>
                    <Row>
                        <Form id="form" onSubmit={this.onSubmit}>
                            <Row>
                                <Col xs="12" sm="6">
                                <FormGroup>
                                    <DatePicker id="datepicker" value={this.state.dateValue}  onChange={(v) => this.onChangeDate(v)}/>
                                </FormGroup>
                                </Col>
                                <Col xs="12" sm="3">
                                    <Button outline color="info" type="submit" length="100" block>Set Filter</Button>
                                </Col>
                                <Col xs="12" sm="3">
                                    <Button outline color="info" onClick={this.reset} length="100" block>Get All</Button>
                                </Col>
                            </Row> 
                        </Form>
                    </Row>
                    <Row>
                        <div style={{ marginTop: "20px" }}>
                            <Table>
                                <tbody>
                                {this.state.NotificationList.map((notification, index) => {
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
                                                                "' from " +
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
                                                    <td>
                                                        {(this.props.erole === '3') 
                                                        ?
                                                        <Button outline color="danger" block onClick={() => this.onDelete(notification.id)}>
                                                            Delete
                                                        </Button>
                                                        :
                                                        null}
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
                                                                    "' from " +
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
                                                        <td>
                                                        {(this.props.erole === '3') 
                                                        ?
                                                        <Button outline color="danger" block onClick={() => this.onDelete(notification.id)}>
                                                            Delete
                                                        </Button>
                                                        :
                                                        null}
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
                                </tbody> 
                            </Table>         
                        </div>  
                    </Row>
                </Container>        
            </React.Fragment>
        )  
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    erole: state.auth.erole,
    username: state.auth.username
  });
  
  export default connect(mapStateToProps,null)(Notification);
