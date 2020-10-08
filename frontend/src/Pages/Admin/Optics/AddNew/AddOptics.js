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
} from 'reactstrap';
import AdminNav from "../../../../Components/AdminNav.component";
import {Image, Header, Icon, Divider, Button} from 'semantic-ui-react'
import {connect} from "react-redux";
import Logo from "../../../../Images/logo.jpg";

var tzoffset = (new Date()).getTimezoneOffset() * 60000;
var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

class AddOptics extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            loading: false,
            alert: 0,
            alertMsg: "",
            description: "",
            pictitle:"",
            uploadpic:false,
            brand:"",
            model:"",
            opticalDesign:"",
            aperture:"",
            magnification:"",
            focal:"",
            viewfinder:"",
            price:"",
            file:null,
            imgSrc:"",
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

    onChangep = event =>{
        const regex = '^[0-9]';
        const value = event.target.value;
        if (value === '' || regex.test(value)) {
            this.setState({ value })
        }
    }

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
        if (this.state.brand.length < 1) {
            error = true;
            alertMsg = "Brand can't be empty";
        }
        if (this.state.model.length < 1) {
            error = true;
            alertMsg = "model can't be empty";
        }
        if (this.state.opticalDesign.length < 1) {
            error = true;
            alertMsg = "optical design can't be empty";
        }
        if (this.state.aperture.length < 1) {
            error = true;
            alertMsg = "aperture can't be empty";
        }
        if (this.state.magnification.length < 1) {
            error = true;
            alertMsg = "magnification can't be empty";
        }
        if (this.state.aperture.length < 1) {
            error = true;
            alertMsg = "aperture can't be empty";
        }
        if (this.state.focal.length < 1) {
            error = true;
            alertMsg = "focal can't be empty";
        }
        if (this.state.viewfinder.length < 1) {
            error = true;
            alertMsg = "view finder can't be empty";
        }
        if (this.state.price.length < 1) {
            error = true;
            alertMsg = "invalid price";
        }
        else if (this.state.description.length < 1) {
            error = true;
            alertMsg = "description can't be empty";
        }
        else if (this.state.file===null) {
            error = true;
            alertMsg = "Please upload a image";
        }
        this.setState({alertMsg: alertMsg});
        return error;
    }

    onSubmit() {
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
            data.append('brand',this.state.brand);
            data.append('model',this.state.model);
            data.append('opticaldesign',this.state.opticalDesign);
            data.append('aperture',this.state.aperture);
            data.append('magnification',this.state.magnification);
            data.append('focal',this.state.focal);
            data.append('viewfinder',this.state.viewfinder);
            data.append('price',this.state.price);
            data.append('detail',this.state.description);
            fetch('http://localhost:8080/addoptics/save',{
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
                    window.location=`/admin/optics`;
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
                <AdminNav/>
                <Container>
                    <Row>
                        <Col xs="12" sm="5">
                            <div className='center' >
                                <Header as='h2'>
                                    <Icon name='file image outline' />
                                    <Header.Content>
                                        Add New Item
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
                                                <Label for="brand">Brand</Label>
                                                <Input type="text" name="brand" id="brand"  onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="5">
                                            <FormGroup>
                                                <Label for="model">Model</Label>
                                                <Input type="text" name="model" id="model"  onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12" sm="5">
                                            <FormGroup>
                                                <Label for="opticalDesign">Optical Design</Label>
                                                <Input type="text" name="opticalDesign" id="opticalDesign"  onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="5">
                                            <FormGroup>
                                                <Label for="aperture">Aperture (mm)</Label>
                                                <Input type="text" name="aperture" id="aperture"  onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12" sm="5">
                                            <FormGroup>
                                                <Label for="magnification">Magnification</Label>
                                                <Input type="text" name="magnification" id="magnification"  onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="5">
                                            <FormGroup>
                                                <Label for="focal">Focal Length (mm) </Label>
                                                <Input type="text" name="focal" id="focal"  onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12" sm="5">
                                            <FormGroup>
                                                <Label for="viewfinder">Viewfinder</Label>
                                                <Input type="text" name="viewfinder" id="viewfinder"  onChange={this.onChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="5">
                                            <FormGroup>
                                                <Label for="price">Price LKR </Label>
                                                <Input type="text" name="price" id="price"  onChange={this.onChange}/>
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

export default connect(mapStateToProps,null)(AddOptics);
