import React, { Component  } from 'react'
import axios from "axios";
import AdminNav from "../../../../Components/AdminNav.component";
import LoadingScreen from "./LoadingPic"
import PopUpButton from './Button'
import { Container,Button,Divider,Message,Pagination,Item, Label, Segment, Header } from 'semantic-ui-react'
import {Col, Modal, ModalBody, ModalFooter, Row, Table} from "reactstrap";
import ZoomPic from "../GlobalGallery/ZoomPic";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default class ReviewPics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Picurls: [],
            activePage: 1,
            totalPage:1,
            pageno:0,
            loading: true,
            isConfirming: false,
            issubmitting:false,
            reachMaxPage:false,
            picurl:"",
            zoompic:false,
        }
       
    }

    componentDidMount = async () => {
        //this.state.pageno = this.state.activePage-1
        await axios.get("http://localhost:8080/reviewPics?pageSize=5&pageNo="+this.state.pageno)
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

    Submit = async(param, e) => {
        this.setState({ isConfirming: true });
        await axios.put("http://localhost:8080/picreviewed/"+e)
        .then(res => {
            this.setState({
                isConfirming: false,
              });
            this.pagingfun()
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
                                                                <td ><Header as='h5'>Date :</Header></td>
                                                                <td>2015-03-11</td>
                                                            </tr>
                                                            <tr>
                                                                <td><Header as='h5'>Time :</Header></td>
                                                                <td>22:22</td>
                                                            </tr>
                                                            <tr>
                                                                <td><Header as='h5'>Location :</Header></td>
                                                                <td>{pic.ownerEmail}</td>
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

                                    <PopUpButton name={"Delete"} color="red"/>
                                    
                                    <Button 
                                        color="blue" 
                                        style={{float: 'right'}}
                                        onClick={() => this.Submit(index, pic.uploadPhotoId)}
                                        disabled={this.state.isConfirming}
                                        loading={this.state.isConfirming}
                                        >
                                        {this.state.isConfirming ?   "Confirm" : "Confirm"}
                                    </Button>

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