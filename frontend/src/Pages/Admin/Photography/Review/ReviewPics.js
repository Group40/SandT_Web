import React, { Component  } from 'react'
import axios from "axios";
import AdminNav from "../../../../Components/AdminNav.component";
import LoadingScreen from "./LoadingPic"
import PicCard from "./Card";
import PopUpButton from './Button'
import { Container,Button,Divider,Message,Pagination } from 'semantic-ui-react'

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
            <AdminNav/> 
            
            <Container style={{ margin: 20 }}>
                        {this.state.Picurls.map((pic, index) => {
                            return (
                            <React.Fragment key={index}>
                                    <PicCard 
                                        title={pic.picTitle}
                                        url={pic.photourl}
                                        detail={pic.picDetails}
                                        name={pic.ownername}
                                        email={pic.ownerEmail}
                                        id={"Kandy, Sri lnka"}
                                        />
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