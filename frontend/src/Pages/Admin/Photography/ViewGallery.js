import React, { Component  } from 'react'
import _ from 'lodash'
import axios from "axios";
import AdminNav from "../../../Components/AdminNav.component";
import LoadingScreen from "./Review/LoadingPic"
import { Container,Button,Divider,Message,Pagination, Item, Label,Segment,Header,Search, Grid } from 'semantic-ui-react'
import { Table,Row,Col, ModalFooter,Modal, ModalHeader, ModalBody } from 'reactstrap';

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default class ViewGallery extends Component {
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
            title2:"sun",
        }
    }

    componentDidMount = async () => {
        if(this.state.value==="")
        {
            await axios.get("http://localhost:8080/adminview?pageSize=5&pageNo="+this.state.pageno)
            .then(res => {
            this.setState({ 
                Picurls: res.data,
                loading: false,
                })
            })
        }
        else
        {
            await axios.get("http://localhost:8080/adminSerchPic/"+this.state.value+"?pageSize=5&pageNo="+this.state.pageno)
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
    
    Submit = async(param, e) => {
        this.setState({ isUnreviewing: true });
        this.toggle()
        await axios.put("http://localhost:8080/picunreviewed/"+this.state.picid)
        .then(res => {
            this.setState({
                isUnreviewing: false,
              });
            this.pagingfun()
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

    toggle = (parm,e) => {
        this.setState({
          modal: !this.state.modal,
          picid: e,
        });
    };
    source = _.times(1, () => ({
        title: "Moon",
      }))

    handleSearchChange = (e, { value }) => {
        this.setState({ isSearchLoading: true, value })
        setTimeout(() => {
            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.title)

          this.setState({
            isSearchLoading: false,
            results: _.filter(this.source, isMatch),
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
                        {this.state.Picurls.map((pic, index) => {
                            return (
                            <React.Fragment key={index}>
                            {this.renderIcon(index,pic.picTitle)}
                            <Item.Group divided>
                                <Item>
                                    <Item.Image src={pic.photourl} />
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
                                                {pic.picDetail}    
                                            </Segment>
                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                            </Item.Group>

                                    <Button 
                                        color="grey" 
                                        style={{float: 'right'}} 
                                        onClick={() => this.renderIcon(index, pic.uploadPhotoId)}
                                        disabled={this.state.isUnreviewing}
                                        loading={this.state.isUnreviewing}
                                        >
                                        {this.state.isUnreviewing ?   "Unreview" : "Unreview"}
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