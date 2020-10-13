import React, { Component  } from 'react'
import axios from "axios";
import AdminNav from "../../../../Components/AdminNav.component";
import LoadingScreen from "./LoadingPic"
import {Container, Button, Divider, Message, Pagination, Item, Label, Segment, Header, Image} from 'semantic-ui-react'
import {Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import ZoomPic from "../GlobalGallery/ZoomPic";
import {connect} from "react-redux";
import Buttontest from "./Button"

const backendURI = require("../../../../BackEndURI");

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

var tzoffset = (new Date()).getTimezoneOffset() * 60000;
var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

class ReviewPics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Picurls: [],
            activePage: 1,
            totalPage:1,
            pageno:0,
            loading: true,
            isConfirming: false,
            isdeletinging: false,
            deletetoggl:false,
            issubmitting:false,
            reachMaxPage:false,
            picurl:"",
            zoompic:false,
            deletepicid:"",
            pictitle:"",
        }
       
    }

    componentDidMount = async () => {
        // this.state.pageno = this.state.activePage-1
        await axios.get(backendURI.url+"/reviewPics?pageSize=5&pageNo="+this.state.pageno)
        .then(res => {
            this.setState({ 
                Picurls: res.data,
                loading: false,
            })
        })
        if((this.state.activePage===this.state.totalPage)&&(this.state.Picurls.length===5)&&(!this.state.reachMaxPage)){
            this.setState({
                totalPage:this.state.totalPage+1
            })
        }
        this.checkPageCount()
         
    }

    checkPageCount(){
        if((this.state.activePage!==1)&&(this.state.Picurls.length===0)){
            this.setState({
                totalPage:this.state.totalPage-1,
                activePage:this.state.activePage-1,
                pageno: this.state.pageno-1,
                reachMaxPage:true
            },
            () =>{
                this.pagingfun()
            }
            )
        } 
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

    Submit = async(param, e,title) => {
        this.setState({
            isConfirming: true,
            pictitle:title,
        });
        const obj3 = {
            authorName: this.props.username+" "+this.props.lname,
            authorType: this.props.erole,
            authorMail: this.props.email,
            name: this.state.pictitle,
            nameType: "confirmed the photo",
            date: localISOTime,
        };

        await axios.put(backendURI.url+"/picreviewed/"+e)
        .then((res) => {
            axios.post(backendURI.url+"/addNotification", obj3)
                .then(res =>{
                    this.setState({
                        isConfirming: false,
                    });
                    this.pagingfun()
                })

        })
    }

    delete = async() => {
        this.setState({
            isdeletinging: true,
            deletetoggl:!this.state.deletetoggl,

        });
        const obj3 = {
            authorName: this.props.username+" "+this.props.lname,
            authorType: this.props.erole,
            authorMail: this.props.email,
            name: this.state.pictitle,
            nameType: "deleted the photo",
            date: localISOTime,
        };

        await axios.delete(backendURI.url+"/deletepic/"+this.state.deletepicid)
            .then(res => {
                axios.post(backendURI.url+"/addNotification", obj3)
                    .then(res =>{
                        this.setState({
                            isdeletinging: false,
                        });
                        this.pagingfun()
                    })

            })
    }

    pagingfun(){
        this.componentDidMount()
    }

    handlePaginationChange = (e, { activePage }) => {
        this.setState({ activePage },
            )
        this.setState({
            pageno: activePage-1,
            loading: true
        }, () =>{
            this.pagingfun()
        }
        )
    }

    zoomtoggle = (parm,e) => {
        this.setState({
            zoompic: !this.state.zoompic,
            picurl: e,
        });
    };

    render(){
        const {
            activePage,
            totalPage,
            
          } = this.state

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
                { this.state.zoompic ?
                    <Modal isOpen={this.state.zoompic} toggle={this.zoomtoggle}>
                        <ModalBody>
                            <ZoomPic url={this.state.picurl} />
                        </ModalBody>
                        <div >
                            <ModalFooter>
                                <Button color="blue" onClick={this.zoomtoggle} >Close</Button>
                            </ModalFooter>
                        </div>
                    </Modal>
                    : null }

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
                                <Button color="red" onClick={this.delete} >Yes</Button>
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
                                        <Item.Image src={pic.photourl}  onClick={() => {this.zoomtoggle(pic.photoid, pic.photourl)}}/>

                                        <Item.Content>
                                            <Item.Header as='a'><Header as='h2'>{pic.picTitle}</Header></Item.Header>
                                            <Item.Meta>
                                                <span className='cinema'>{pic.ownername}</span>
                                                <Label>{pic.ownerEmail}</Label>
                                            </Item.Meta>
                                            <Item.Description>
                                                <Row>
                                                    <Col  sm="4">
                                                        <Table borderless >
                                                            <tbody>
                                                            <tr>
                                                                <td ><Header as='h5'>Capture Date :</Header></td>
                                                                <td>{pic.date}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><Header as='h5'>Town :</Header></td>
                                                                <td>{pic.town}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><Header as='h5'>District :</Header></td>
                                                                <td>{pic.distric}</td>
                                                            </tr>
                                                            </tbody>
                                                        </Table>
                                                    </Col>
                                                </Row>

                                            </Item.Description>

                                            <Item.Description>
                                                <Header as='h5' attached='top'>Description</Header>
                                                <Segment attached>
                                                    {pic.picDetails}
                                                </Segment></Item.Description>
                                        </Item.Content>
                                    </Item>
                                </Item.Group>

                                    <Button
                                        color="red"
                                        style={{float: 'right'}}
                                        onClick={() => this.deletepicdata(pic.photourl, pic.uploadPhotoId,pic.picTitle)}
                                        disabled={this.state.isdeletinging}
                                        loading={this.state.isdeletinging}
                                    >
                                        {this.state.isdeletinging ?   "Deleting" : "Delete"}
                                    </Button>


                                    <Button 
                                        color="blue" 
                                        style={{float: 'right'}}
                                        onClick={() => this.Submit(index, pic.uploadPhotoId,pic.picTitle)}
                                        disabled={this.state.isConfirming}
                                        loading={this.state.isConfirming}
                                        >
                                        {this.state.isConfirming ?   "Confirm" : "Confirm"}
                                    </Button>

                                    {/*<Buttontest*/}
                                    {/*    color={"red"}*/}
                                    {/*    color2={"blue"}*/}
                                    {/*    name={"Start"}*/}
                                    {/*    name2={"End"}*/}
                                    {/*    id={"sadsad"}*/}
                                    {/*    />*/}

                                    <Divider hidden />
                                    <Divider hidden />
                                    <Divider hidden />
                                    <Divider />

                            </React.Fragment>
                            );
                        })}
                        <div className="setmiddle">
                            <Pagination 
                                defaultActivePage={activePage}
                                onPageChange={this.handlePaginationChange}
                                firstItem={null}
                                lastItem={null}
                                pointing
                                secondary
                                totalPages={totalPage}
                            />
                        </div>
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

export default connect(mapStateToProps,null)(ReviewPics);