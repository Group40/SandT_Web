import React, { Component  } from 'react'
import _ from 'lodash'
import axios from "axios";
import AdminNav from "../../../../Components/AdminNav.component";
import LoadingScreen from "../Review/LoadingPic"
import { Container,Button,Divider,Message,Pagination, Item, Label,Segment,Header,Search, Grid } from 'semantic-ui-react'
import { Table,Row,Col, ModalFooter,Modal, ModalHeader, ModalBody } from 'reactstrap';
import ZoomPic from "./ZoomPic";
import {connect} from "react-redux";

const backendURI = require("../../../../BackEndURI");

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


var tzoffset = (new Date()).getTimezoneOffset() * 60000;
var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

class ViewGallery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Picurls: [],
            activePage: 1,
            totalPage:1,
            pageno:0,
            loading: true,
            isUnreviewing: false,
            issubmitting:false,
            reachMaxPage:false,
            modal:false,
            picid:"",
            value:"",
            isSearchLoading:false,
            title:"sun",
            picurl:"",
            zoompic:false,
            pictitle:"",
        }
    }

    componentDidMount = async () => {
        if(this.state.value==="")
        {
            await axios.get(backendURI.url+"/adminview?pageSize=5&pageNo="+this.state.pageno)
            .then(res => {
            this.setState({ 
                Picurls: res.data,
                loading: false,
                })
            })
        }
        else
        {
            await axios.get(backendURI.url+"/adminSerchPic/"+this.state.value+"?pageSize=5&pageNo="+this.state.pageno)
            .then(res => {
            this.setState({ 
                Picurls: res.data,
                loading: false,
                })
            })
        }
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
    
    Submit = async() => {
        const obj3 = {
            authorName: this.props.username+" "+this.props.lname,
            authorType: this.props.erole,
            authorMail: this.props.email,
            name: this.state.pictitle,
            nameType: "unreviewd the photo",
            date: localISOTime,
        };
        this.setState({ isUnreviewing: true });
        this.toggle()
        await axios.put(backendURI.url+"/picunreviewed/"+this.state.picid)
        .then(res => {
            axios.post(backendURI.url+"/addNotification", obj3)
                .then(res => {
                    this.setState({
                        isUnreviewing: false,
                    });
                    this.pagingfun()
                })

        })
    }

    confirmBtn = async () =>{
        this.setState({
            modal: !this.state.modal,
        },
        this.Submit("",this.state.picid));
    }

    pagingfun(){
        this.componentDidMount()
    }

    handlePaginationChange = (e, { activePage }) => {
        this.setState({ activePage },
            )
        this.setState({
            pageno: activePage-1,
            loading: true,
        }, () =>{
            this.pagingfun()
        }
        )
    }

    toggle = (parm,e,title) => {
        this.setState({
          modal: !this.state.modal,
          picid: e,
            pictitle:title,
        });
    };

    zoomtoggle = (parm,e) => {
        this.setState({
            zoompic: !this.state.zoompic,
            picurl: e,
        });
    };

    handleSearchChange = (e, { value }) => {
        this.setState({ isSearchLoading: true, value })
        setTimeout(() => {
            //const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            //const isMatch = (result) => re.test(result.title)

          this.setState({
            isSearchLoading: false,
                  activePage:1,
                  totalPage:1,
            //results: _.filter(this.source, isMatch),
          },
            () =>{
                this.pagingfun()
            }
          )
        }, 300)
    }
    
    handleResultSelect = (e, { result }) => this.setState(
        { 
            value: result.title
             },() =>{
                this.pagingfun()
    })

    renderIcon = (param, e) =>{
        if(param===0){
            //this.state.title2=e
        }
    }

    render(){
        const {
            activePage,
            totalPage,
            isSearchLoading, 
            value,
            results, 
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
            return(
                <React.Fragment>
                    <AdminNav/>
                    <Container style={{ margin: 20 }}>
                        <div className="right">
                            <Grid>
                                <Grid.Column width={6}>
                                    <Search
                                        loading={isSearchLoading}
                                        onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                            leading: true,
                                        })}
                                        results={results}
                                        onResultSelect={this.handleResultSelect}
                                        value={value}
                                    />
                                </Grid.Column>
                            </Grid>
                            <Divider hidden />
                        </div>
                        <Divider hidden />
                        <Divider hidden />
                        <Divider hidden />
                    </Container>
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
            { this.state.modal ?
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Are you sure?</ModalHeader>
                    <ModalBody>
                        Do you really want to unreview this image ? 
                    </ModalBody>
                    <div >
                    <ModalFooter>
                        <Button color="red" onClick={() => this.Submit("",this.state.picid)} >Yes</Button>
                        <Button color="blue" onClick={this.toggle} >No</Button>
                    </ModalFooter>
                    </div>
                </Modal>
            : null }

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
                <div className="right">
                    <Grid>
                        <Grid.Column width={6}>
                            <Search
                                loading={isSearchLoading}
                                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                    leading: true,
                                })}
                                onResultSelect={this.handleResultSelect}
                                value={value}
                                showNoResults={false}
                            />
                        </Grid.Column>
                    </Grid>
                    <Divider hidden />
                </div>
                <Divider hidden />
                <Divider hidden />
                <Divider hidden />
            </Container>
            
            <Container style={{ margin: 20 }}>
                        {this.state.Picurls.map((pic, index) => {
                            return (
                            <React.Fragment key={index}>
                            {this.renderIcon(index,pic.picTitle)}
                            <Item.Group divided>
                                <Item>
                                    <Item.Image src={pic.photourl} onClick={() => this.zoomtoggle(index, pic.photourl)} />
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
                                                                <td>{this.state.title}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><Header as='h5'>Time :</Header></td>
                                                                <td>22:22</td>
                                                            </tr>
                                                            <tr>
                                                                <td><Header as='h5'>Location :</Header></td>
                                                                <td>Sri Lanka</td>
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
                                            </Segment>
                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                            </Item.Group>

                                    <Button
                                        color="red"
                                        style={{float: 'right'}}
                                        onClick={() => this.toggle(index, pic.uploadPhotoId,pic.picTitle)}
                                        disabled={this.state.isUnreviewing}
                                        loading={this.state.isUnreviewing}
                                        >
                                        {this.state.isUnreviewing ?   "Unreview" : "Unreview"}
                                    </Button>

                                    <Button
                                        color="blue"
                                        style={{float: 'right'}}
                                        onClick={() => this.zoomtoggle(index, pic.photourl)}
                                    >
                                        View Pic
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

const mapStateToProps = state => ({
    erole: state.auth.erole,
    username: state.auth.username,
    lname : state.auth.lname,
    email : state.auth.email,
});

export default connect(mapStateToProps,null)(ViewGallery);