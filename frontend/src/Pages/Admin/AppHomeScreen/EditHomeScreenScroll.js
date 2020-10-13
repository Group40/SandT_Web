import React, { Component  } from 'react'
import axios from "axios";
import AdminNav from "../../../Components/AdminNav.component";
import LoadingScreen from "./../Photography/Review/LoadingPic"
import {Container, Button, Divider, Item, Segment, Header, Image,Icon} from 'semantic-ui-react'
import {Col, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {connect} from "react-redux";

const backendURI = require("../../../BackEndURI");

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


class EditHomeScreenScroll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Picurls: [],
            pageno:0,
            loading: true,
            isConfirming: false,
            isdeletinging: false,
            deletetoggl:false,
            issubmitting:false,
            picurl:"",
            deletepicid:"",
            file:null,
            btnloading:false,
        }
        this.onChangepic = this.onChangepic.bind(this)
    }

    componentDidMount = async () => {
        await axios.get(backendURI.url+"/appimage/view")
            .then(res => {
                this.setState({
                    Picurls: res.data,
                    loading: false,
                })
            })
    }

    deletepicdata(url,id){
        this.setState({
            deletepicid:id,
            picurl: url,
        }, () => this.deletetoggle())
    }

    deletetoggle = () => {
        this.setState({
            deletetoggl:!this.state.deletetoggl,
        });
    };

    validate = () => {
        let error = false;
        let alertMsg = "";
        if (this.state.file===null) {
            error = true;
            alertMsg = "Please upload a image";
        }
        this.setState({alertMsg: alertMsg});
        return error;
    }

    onSubmit = async ()=> {
        const error = this.validate();
        this.setState({
            btnloading: true,
        });
        if(!error){
            const data = new FormData();
            data.append('image',this.state.file);
            data.append('email',this.props.email);
            fetch(backendURI.url+'/appimage/upload',{
                method: 'post',
                body: data
            }).catch((error) => {
                console.log(error);
                this.setState({
                    alertMsg: "Server is under maintanace, please try again later!",
                    alert: 1,
                    btnloading: false
                });
            }).then(res => {
                this.setState({
                    btnloading:false,
                });
                if(res.status===200){
                    this.componentDidMount();
                    //window.open(`/admin/adminpics`);
                    window.location=`/admin/scroll`;
                }
            });
        }
        else{
            this.setState({
                alert: 1,
                btnloading: false
            });
        }
    }

    delete = async() => {
        this.setState({
            isdeletinging: true,

        });

        await axios.delete(backendURI.url+"/appimage/delete/"+this.state.deletepicid)
            .then(res => {
                this.setState({
                    isdeletinging: false,
                    deletetoggl:!this.state.deletetoggl,
                });
                this.pagingfun()
            })
    }

    pagingfun(){
        this.componentDidMount()
    }

    onChangepic(e) {
        this.setState({file:e.target.files[0]});
    }


    render(){
        if (this.state.loading){
            return(
                <React.Fragment>

                    <AdminNav/>
                    <Container style={{ margin: 20 }}>
                        <LoadingScreen />
                    </Container>

                </React.Fragment>
            )
        }
        return(
            <React.Fragment>
                { this.state.deletetoggl ?
                    <Modal isOpen={this.state.deletetoggl} toggle={this.deletetoggle}>
                        <ModalHeader>
                            <Header>Are you really want delete this image</Header>
                        </ModalHeader>
                        <ModalBody>
                            <div className="center2">
                                <Col xs="6" sm="6">
                                    <Image src={this.state.picurl} size='medium'  />
                                </Col>
                            </div>
                        </ModalBody>
                        <div >
                            <ModalFooter>
                                <Button color="blue" onClick={this.deletetoggle} >No</Button>
                                <Button color="red" onClick={this.delete}
                                        disabled={this.state.isdeletinging}
                                        loading={this.state.isdeletinging}
                                >Yes</Button>
                            </ModalFooter>
                        </div>
                    </Modal>
                    : null }

                <AdminNav/>

                <Container style={{ margin: 20 }}>
                    {this.state.Picurls.map((pic, index) => {
                            return (
                                <React.Fragment key={index}>

                                    <Item.Group divided>
                                        <Item>
                                            <Item.Content>
                                                <Image className={"leftimg"}
                                                       fluid
                                                       src={pic.imageurl}
                                                       size='medium'
                                                />
                                            </Item.Content>
                                        </Item>
                                    </Item.Group>
                                    <Divider hidden />
                                    <Button
                                        color="red"
                                        style={{float: 'right'}}
                                        onClick={() => this.deletepicdata(pic.imageurl, pic.id)}

                                    >
                                        {this.state.isdeletinging ?   "Delete" : "Delete"}
                                    </Button>

                                    <Divider hidden />
                                    <Divider hidden />
                                    <Divider hidden />
                                    <Divider />



                                </React.Fragment>
                            );
                        }
                    )}
                    {
                        this.state.Picurls.length<=4
                            ?
                            <Segment placeholder>
                                <Header icon>
                                    <Icon name='upload' />
                                    Upload new scrolling image for Mobile App
                                </Header>
                                <Divider hidden />
                                <div className={"right2"}>
                                    <Input type="file" name="file" id="file" onChange={this.onChangepic} />
                                </div>
                                <div>
                                    {
                                        this.state.file===null
                                            ?<Divider hidden />
                                            :<div>
                                                {this.state.btnloading ===true ?
                                                    <Button basic loading>
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
                                            </div>
                                    }
                                </div>

                            </Segment>

                            :
                            <Segment placeholder>
                                <Header icon>
                                    <Icon name='warning sign' />
                                    Maximum image uploaded
                                </Header>
                            </Segment>
                    }

                </Container>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    erole: state.auth.erole,
    email : state.auth.email,
});

export default connect(mapStateToProps,null)(EditHomeScreenScroll);