import React, { Component } from "react";
import axios from 'axios';
import {
    Container,
    Spinner,
    Row,
    Col,
    Alert,
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalBody,
    ModalFooter, ModalHeader
} from 'reactstrap';
import DatePicker from 'reactstrap-date-picker';
import AdminNav from "../../../../Components/AdminNav.component";
import {Image,Header, Icon,Divider,Button} from 'semantic-ui-react'
import {connect} from "react-redux";
import moment from "moment";

const backendURI = require("../../../../BackEndURI");

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


var tzoffset = (new Date()).getTimezoneOffset() * 60000;
var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

class EditMyPic extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            loading: true,
            alert: 0,
            alertMsg: "",
            description: "",
            picurl:'',
            pictitle:"",
            deletepic:false,
            updatepic:false,
            picid:"",
            isdeletinging:false,
            date:"",
            town:"",
            distric:""
        };
    }

    componentDidMount = async () => {
        await axios.get(backendURI.url+"/editMyPic/"+this.props.match.params.id+"?email="+this.props.email)
            .then(res => {
                this.setState({
                    picurl: res.data.photourl,
                    pictitle: res.data.picTitle,
                    description: res.data.picDetails,
                    loading: false,
                    fieldLoading: false,
                    picid:res.data.uploadPhotoId,
                    date:res.data.date,
                    town:res.data.town,
                    distric:res.data.distric,
                })
            })
    }

    closeAlert = () => {
        this.setState({ alert: 0 });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });

    };

    onChangeDate(value){
        this.setState({
            dateValue: value,
        });
    };

    deletetoggle = () => {
        this.setState({
            deletepic: !this.state.deletepic,
        });
    };

    updatetoggle = () => {
        this.setState({
            updatepic: !this.state.updatepic,
        });
    };

    validate = () => {
        let error = false;
        let alertMsg = "";
        if (this.state.pictitle.length < 1) {
            error = true;
            alertMsg = "Title can't be empty";
        }
        if (this.state.description.length < 1) {
            error = true;
            alertMsg = "description can't be empty";
        }
        this.setState({alertMsg: alertMsg});
        return error;
    }

    onSubmit(e) {
        e.preventDefault();
        const error = this.validate();
        this.setState({
            loading: true,
            alert: 0
        });
        if(!error){
            const data = new FormData();
            data.append('title',this.state.pictitle);
            data.append('detail',this.state.description);
            data.append('picid',this.state.picid);
            data.append('date',this.state.date);
            data.append('town',this.state.town);
            data.append('distric',this.state.distric);
            fetch(backendURI.url+'/photouploading/updatedata',{
                method: 'post',
                body: data
            }).catch((error) => {
                    console.log(error);
                    this.setState({
                        alertMsg: "Server is under maintanace, please try again later!",
                        alert: 1,
                        loading: false
                    });
                })
                .then(res => {
                    this.setState({
                        loading:false,
                    },() => this.updatetoggle());
                    if(res.status===200){
                        //window.open(`/admin/adminpics`);
                        window.location=`/admin/adminpics`;
                    }
                });
        }
        else{
            this.setState({
                alert: 1,
                loading: false
            },() => this.updatetoggle());
        }

    }
    delete = async() => {
        const obj3 = {
            authorName: this.props.username+" "+this.props.lname,
            authorType: this.props.erole,
            authorMail: this.props.email,
            name: this.state.pictitle,
            nameType: "deleted the photo",
            date: localISOTime,
        };
        this.setState({
            isdeletinging: true,
            deletepic:!this.state.deletepic,});
        await axios.delete(backendURI.url+"/deletepic/"+this.state.picid)
            .then(res => {
                axios.post(backendURI.url+"/addNotification", obj3)
                    .then(
                        res => {
                            this.setState({
                                isdeletinging: false,
                            });
                        }
                    )
                window.location=`/admin/adminpics`;
            })
    }

    render(){
        return (
            <React.Fragment>

                { this.state.deletepic ?
                    <Modal isOpen={this.state.deletepic} toggle={this.deletetoggle}>
                        <ModalHeader toggle={this.deletetoggle}>Are you sure?</ModalHeader>
                        <ModalBody>
                            Do you really want to Delete this image ?
                        </ModalBody>
                        <div >
                            <ModalFooter>
                                <Button color="blue" onClick={this.deletetoggle} >No</Button>
                                <Button color="red" onClick={this.delete} >Yes</Button>
                            </ModalFooter>
                        </div>
                    </Modal>
                    : null }
                { this.state.updatepic ?
                    <Modal isOpen={this.state.updatepic} toggle={this.updatetoggle}>
                        <ModalHeader toggle={this.updatetoggle}>Are you sure?</ModalHeader>
                        <ModalBody>
                            Do you really want to  Update this ?
                        </ModalBody>
                        <div >
                            <ModalFooter>
                                <Button color="blue" onClick={this.updatetoggle} >No</Button>
                                <Button color="red" onClick={this.onSubmit} >Yes</Button>
                            </ModalFooter>
                        </div>
                    </Modal>
                    : null }
                <AdminNav/>

                <Container>
                    <Row>
                        <Col xs="12" sm="5">
                            <div>
                                <div className="center">
                                    <Image src={this.state.picurl} size='medium'  />
                                    <Col xs="6" sm="6">
                                    </Col>
                                </div>
                            </div>
                        </Col>
                        <Col  xs="12" sm="7">
                            <div className="center">
                                <div >
                                    <Header as='h2'>
                                        <Icon name='settings' />
                                        <Header.Content>
                                            Edit My Uploads
                                            <Header.Subheader>S & T Group</Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                    <Divider hidden />
                                </div>
                                <Form>
                                    <Row>
                                        <Col xs="12" sm="10">
                                            <FormGroup>
                                                <Label for="pictitle">Title</Label>
                                                <Input type="text" name="pictitle" id="pictitle" value={this.state.pictitle} onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12" sm="5">
                                            <FormGroup>
                                                <Label for="distric">Captured Distric</Label>
                                                <Input type="text" name="distric" id="distric" value={this.state.distric} onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="5">
                                            <FormGroup>
                                                <Label for="town">Town</Label>
                                                <Input type="text" name="town" id="town" value={this.state.town} onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12" sm="4">
                                            <FormGroup>
                                                <label htmlFor="date">Date</label>
                                                <Input type="date" id="datepicker" name="date" value={this.state.date}
                                                       onChange={e => this.change(e)} mindate={moment().toDate()}/>
                                                <div style={{fontSize: 12, color: "red"}}>{this.state.dateError}</div>
                                            </FormGroup>
                                        </Col>

                                    </Row>

                                    <FormGroup>
                                        <Label for="description">Description</Label>
                                        <Input type="textarea" name="description" id="description"
                                               value={this.state.description} onChange={this.onChange}/>
                                    </FormGroup>

                                    <Row xs="12" sm="12">
                                        <center>
                                            { this.state.loading ?
                                                <Spinner animation="border" className="spinner2" />
                                                : null}
                                        </center>
                                    </Row>

                                    { this.state.alert === 1 ?
                                        <Alert color="danger" status={this.state.alert}>
                                            {this.state.alertMsg}
                                        </Alert>
                                        : null }
                                    <Divider hidden />
                                </Form>

                            </div>
                        </Col>
                    </Row>
                    <div className="right">
                        <Row>
                            <Col>
                                <Button
                                    color="blue"
                                    style={{float: 'right'}}
                                    onClick={() => this.updatetoggle()}
                                >
                                    Update
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    color="red"
                                    onClick={() => this.deletetoggle()}
                                    disabled={this.state.isdeletinging}
                                    loading={this.state.isdeletinging}
                                >
                                    {this.state.isdeletinging ?   "Deleting" : "Delete"}
                                </Button>
                            </Col>
                        </Row>
                    </div>

                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    erole: state.auth.erole,
    username: state.auth.username,
    lname : state.auth.lname,
    email : state.auth.email,
});

export default connect(mapStateToProps,null)(EditMyPic);
