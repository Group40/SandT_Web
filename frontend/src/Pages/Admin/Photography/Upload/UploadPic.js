import React, { Component } from "react";
import {
    Container,
    Row,
    Col,
    Alert,
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalBody,
    ModalFooter, ModalHeader, Table
} from 'reactstrap';
import DatePicker from 'reactstrap-date-picker';
import AdminNav from "../../../../Components/AdminNav.component";
import {Image, Header, Icon, Divider, Button, Segment} from 'semantic-ui-react'
import {connect} from "react-redux";
import Logo from "../../../../Images/logo.jpg";

var tzoffset = (new Date()).getTimezoneOffset() * 60000;
var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

class UploadPic extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            loading: false,
            alert: 0,
            alertMsg: "",
            description: "",
            town:"",
            distric:"",
            pictitle:"",
            uploadpic:false,
            picid:"",
            file:null,
            imgSrc:"",
            date:"",
            dateValue: localISOTime,
        }
        //this.onChange = this.onChange.bind(this)
        this.onChangepic = this.onChangepic.bind(this)
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

    updatetoggle = () => {
        const error = this.validate();
        if(!error)
        {
            this.setState({
                uploadpic: !this.state.uploadpic,
            });
        }
        else{
            this.setState({
                alert: 1,
                loading: false
            });
        }
    };

    onChangepic(e) {
        this.setState({file:e.target.files[0]});
    }

    validate = () => {
        let error = false;
        let alertMsg = "";
        if (this.state.pictitle.length < 1) {
            error = true;
            alertMsg = "Title can't be empty";
        }
        else if (this.state.description.length < 1) {
            error = true;
            alertMsg = "description can't be empty";
        }
        else if (this.state.town.length < 1) {
            error = true;
            alertMsg = "town can't be empty";
        }
        else if (this.state.distric.length < 1) {
            error = true;
            alertMsg = "distric can't be empty";
        }
        else if (document.getElementById("datepicker").value.substring(0, 10).length < 1) {
            error = true;
            alertMsg = "You have to pick a real date";
        }
        else if (this.state.file===null) {
            error = true;
            alertMsg = "Please upload a image";
        }
        this.setState({alertMsg: alertMsg});
        return error;
    }

    onSubmit() {
        this.state.data=document.getElementById("datepicker").value.substring(0, 10);
        //e.preventDefault();
        const error = this.validate();
        this.setState({
            loading: true,
            alert: 0
        });
        if(!error){
            const data = new FormData();
            data.append('image',this.state.file);
            data.append('title',this.state.pictitle);
            data.append('detail',this.state.description);
            data.append('name',this.props.username+" "+this.props.lname,);
            data.append('email',this.props.email);
            data.append('date',this.props.date);
            data.append('town',this.props.town);
            data.append('distric',this.props.distric);
            //data.append('role',this.props.erole);
            fetch('http://localhost:8080/photouploading/adminuploadpic',{
                method: 'post',
                body: data
            }).catch((error) => {
                console.log(error);
                this.setState({
                    alertMsg: "Server is under maintanace, please try again later!",
                    alert: 1,
                    loading: false
                });
            }).then(res => {
                    this.setState({
                        loading:false,
                    },//() => this.updatetoggle()
                    );
                    if(res.status===200){
                        //window.open(`/admin/adminpics`);
                        window.location=`/admin/adminpics`;
                    }
                    else{
                        console.log(error);
                        this.setState({
                            alertMsg: "Something went wrong",
                            alert: 1,
                            loading: false
                        });
                    }
                });
        }
        else{
            this.setState({
                alert: 1,
                loading: false
            });
        }

    }

    render(){
        return (
            <React.Fragment>
                { this.state.uploadpic ?
                    <Modal isOpen={this.state.uploadpic} toggle={this.updatetoggle}>
                        <ModalHeader toggle={this.updatetoggle}>
                            <Header>{this.state.pictitle}</Header>
                        </ModalHeader>
                        <ModalBody>
                            <div >
                                <Col xs="6" sm="6">
                                    <Image src={this.state.imgSrc} size='medium'  />
                                </Col>
                            </div>
                            <Divider hidden />
                            <Divider hidden />
                            <div>
                                <Col >
                                    <Table  >
                                        <tbody>
                                        <tr>
                                            <td ><Header as='h5'>Date : 2012.30.3</Header></td>
                                        </tr>
                                        <tr>
                                            <td><Header as='h5'>Time : 12:10</Header></td>
                                        </tr>
                                        <tr>
                                            <td><Header as='h5'>Location : Kandy,Sri Lanka</Header></td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </div>
                            <div>
                                <Header as='h5' attached='top'>Description</Header>
                                <Segment attached>
                                    {this.state.description}
                                </Segment>
                            </div>
                        </ModalBody>
                        <div >
                            <ModalFooter>
                                <Button color="blue" onClick={this.onSubmit} > Upload </Button>
                                <Button color="blue" onClick={this.updatetoggle} > Cancel </Button>
                            </ModalFooter>
                        </div>
                    </Modal>
                    : null }
                <AdminNav/>
                <Container>
                    <Row>
                        <Col xs="12" sm="5">
                            <div className='center' >
                                <Header as='h2'>
                                    <Icon name='file image outline' />
                                    <Header.Content>
                                        Upload New Image
                                        <Header.Subheader>S & T Group</Header.Subheader>
                                    </Header.Content>
                                </Header>
                                <Divider hidden />
                            </div>
                            <div>
                                <div>
                                    <Col xs="6" sm="6">
                                        <Image src={Logo} size='medium'  />
                                    </Col>
                                </div>
                            </div>
                        </Col>
                        <Col  xs="12" sm="7">
                            <div className="center">

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
                                                <Label for="date">Capture Date</Label>
                                                <DatePicker id="datepicker" value={this.state.dateValue}  onChange={(v) => this.onChangeDate(v)}/>
                                            </FormGroup>
                                        </Col>

                                    </Row>

                                    <FormGroup>
                                        <Label for="description">Description</Label>
                                        <Input type="textarea" name="description" id="description"
                                               value={this.state.description} onChange={this.onChange}/>
                                    </FormGroup>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label for="file">Image</Label>
                                                <Input type="file" name="file" id="file" onChange={this.onChangepic} />

                                            </FormGroup>
                                        </Col>

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
                            <Col xs="12" sm="10">
                                {this.state.loading ===true ?
                                    <Button loading primary>
                                        Loading
                                    </Button>

                                    :
                                    <Button
                                            color="blue"
                                            onClick={() => this.onSubmit()}
                                        >
                                            Upload
                                        </Button>
                                }
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

    export default connect(mapStateToProps,null)(UploadPic);
