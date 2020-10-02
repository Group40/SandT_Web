import React, { Component  } from 'react'
import axios from "axios";
import AdminNav from "../../../../Components/AdminNav.component";
import LoadingScreen from "./MyPicLoading"
import {Container, Button, Message, Pagination, Segment, Header, Image, Grid, Divider} from 'semantic-ui-react'
import {Col, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import ZoomPic from "./ViewPic";
import { connect } from 'react-redux';

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

class MyPics extends Component {
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
            pictitle:"",
            picdetails:"",
            picid:"",
            redirecturl:"",
        }

    }

    componentDidMount = async () => {
        await axios.get("http://localhost:8080/getMypicslist/"+this.props.email+"?pageSize=21&pageNo="+this.state.pageno)
            .then(res => {
                this.setState({
                    Picurls: res.data,
                    loading: false,
                })
            })
        if((this.state.activePage===this.state.totalPage)&&(this.state.Picurls.length===21)&&(!this.state.reachMaxPage)){
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

    pagingfun(){
        this.componentDidMount()
    }

    redirect =() =>{
        this.zoomtoggle();
        window.location=('editmypic/'+this.state.picid);
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

    zoomtoggle = (id,url,title,data) => {
        this.setState({
            zoompic: !this.state.zoompic,
            picid:id,
            picurl: url,
            pictitle:title,
            picdetails:data,

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
                        <ModalHeader toggle={this.zoomtoggle}>
                            <Header>{this.state.pictitle}</Header>
                        </ModalHeader>
                        <ModalBody>
                            <div >
                                <ZoomPic url={this.state.picurl} />
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
                                    {this.state.picdetails}
                                </Segment>
                            </div>
                        </ModalBody>
                        <div >
                            <ModalFooter>
                                <Button color="blue" onClick={this.redirect} > Edit </Button>
                            </ModalFooter>
                        </div>
                    </Modal>
                    : null }
                <AdminNav/>
                <Divider hidden />
                <Divider hidden />
                <Container style={{ margin: 20 }}>
                    <Grid columns={2} relaxed='very'>
                        <Image.Group size='small'>
                            {this.state.Picurls.map((pic, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Image src={pic.photourl} onClick={() => {
                                            this.zoomtoggle(pic.uploadPhotoId, pic.photourl,pic.picTitle,pic.picDetails)}}/>
                                    </React.Fragment>
                                );
                            })}
                        </Image.Group>
                    </Grid>

                    <div className="setmiddle">
                        {this.state.Picurls.length>15 ?
                            <Pagination
                                defaultActivePage={activePage}
                                onPageChange={this.handlePaginationChange}
                                firstItem={null}
                                lastItem={null}
                                pointing
                                secondary
                                totalPages={totalPage}
                            />
                            : null
                        }
                    </div>
                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    email: state.auth.email
});

export default connect(mapStateToProps,null)(MyPics);