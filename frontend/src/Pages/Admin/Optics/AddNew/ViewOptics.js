import React, { Component  } from 'react'
import axios from "axios";
import AdminNav from "../../../../Components/AdminNav.component";
import LoadingScreen from "../../Photography/Review/LoadingPic"
import {Container, Button, Divider, Message, Item, Label, Segment, Header, Image} from 'semantic-ui-react'
import {Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import {connect} from "react-redux";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const backendURI = require("../../../../BackEndURI");

class ViewOptics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Picurls: [],
            loading: true,
            isConfirming: false,
            isdeletinging: false,
            deletetoggl:false,
            issubmitting:false,
            picurl:"",
            deletepicid:"",
            pictitle:"",
        }

    }

    componentDidMount = async () => {
        // this.state.pageno = this.state.activePage-1
        await axios.get(backendURI.url+"/addoptics/show")
            .then(res => {
                this.setState({
                    Picurls: res.data,
                    loading: false,
                })
            })
    }

    deletepicdata(url,id,title){
        this.setState({
            deletepicid:id,
            picurl: url,
            pictitle:title,
        }, () => this.deletetoggle())
    }

    deletetoggle = () => {
        this.setState({
            deletetoggl:!this.state.deletetoggl,
        });
    };

    // Submit = async(param, e,title) => {
    //     this.setState({
    //         isConfirming: true,
    //         pictitle:title,
    //     });
    //     const obj3 = {
    //         authorName: this.props.username+" "+this.props.lname,
    //         authorType: this.props.erole,
    //         authorMail: this.props.email,
    //         name: this.state.pictitle,
    //         nameType: "confirmed the photo",
    //         date: localISOTime,
    //     };
    //
    //     await axios.put("http://localhost:8080/picreviewed/"+e)
    //         .then((res) => {
    //             axios.post("http://localhost:8080/addNotification", obj3)
    //                 .then(res =>{
    //                     this.setState({
    //                         isConfirming: false,
    //                     });
    //                     this.pagingfun()
    //                 })
    //
    //         })
    // }

    delete = async() => {
        this.setState({
            isdeletinging: true,
        });

        await axios.delete(backendURI.url+"/addoptics/delete/"+this.state.deletepicid)
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
        else if(this.state.Picurls.length===0){
            //this.checkPageCount()
            return(
                <React.Fragment>

                    <AdminNav/>
                    <Container style={{ margin: 20 }}>
                        <div>
                            <Message info>
                                <Message.Header>Nothing to show</Message.Header>
                                <p>Empty</p>
                            </Message>
                        </div>
                    </Container>
                </React.Fragment>
            )
        }
        return(

            <React.Fragment>

                { this.state.deletetoggl ?
                    <Modal isOpen={this.state.deletetoggl} toggle={this.deletetoggle}>
                        <ModalHeader>
                            <Header>Are you really want delete this item ?</Header>
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
                                <Button
                                    color="red"
                                    onClick={this.delete}
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
                                        <Item.Image src={pic.url}/>

                                        <Item.Content>
                                            <Item.Header as='a'><Header as='h2'> {pic.title}</Header></Item.Header>
                                            <Item.Meta>
                                                <Label>{pic.brand}</Label>
                                            </Item.Meta>
                                            <Item.Description>
                                                <Row>
                                                    <Col  sm="4">
                                                        <Table borderless >
                                                            <tbody>
                                                            <tr>
                                                                <td ><Header as='h5'>Model :</Header></td>
                                                                <td>{pic.model}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><Header as='h5'>Optical Design :</Header></td>
                                                                <td>{pic.opticaldesign}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><Header as='h5'>Aperture :</Header></td>
                                                                <td>{pic.aperture}</td>
                                                            </tr>

                                                            <tr>
                                                                <td ><Header as='h5'>Magnification :</Header></td>
                                                                <td>{pic.magnification}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><Header as='h5'>Focal :</Header></td>
                                                                <td>{pic.focal}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><Header as='h5'>Price :</Header></td>
                                                                <td>{pic.price}</td>
                                                            </tr>
                                                            </tbody>
                                                        </Table>
                                                    </Col>
                                                </Row>

                                            </Item.Description>

                                            <Item.Description>
                                                <Header as='h5' attached='top'>Description</Header>
                                                <Segment attached>
                                                    {pic.detail}
                                                </Segment></Item.Description>
                                        </Item.Content>
                                    </Item>
                                </Item.Group>

                                <Button
                                    color="red"
                                    style={{float: 'right'}}
                                    onClick={() => this.deletepicdata(pic.url, pic.id,pic.title)}
                                >
                                    {this.state.isdeletinging ?   "Delete" : "Delete"}
                                </Button>


                                {/*<Button*/}
                                {/*    color="blue"*/}
                                {/*    style={{float: 'right'}}*/}
                                {/*    onClick={() => this.Submit(index, pic.uploadPhotoId,pic.picTitle)}*/}
                                {/*    disabled={this.state.isConfirming}*/}
                                {/*    loading={this.state.isConfirming}*/}
                                {/*>*/}
                                {/*    {this.state.isConfirming ?   "Confirm" : "Confirm"}*/}
                                {/*</Button>*/}


                                <Divider hidden />
                                <Divider hidden />
                                <Divider hidden />
                                <Divider />

                            </React.Fragment>
                        );
                    })}

                </Container>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    erole: state.auth.erole,
    username: state.auth.username,
    lname : state.auth.lname,
    email : state.auth.email,
});

export default connect(mapStateToProps,null)(ViewOptics);