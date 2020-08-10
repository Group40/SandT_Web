import React, { Component } from "react";
import axios from 'axios';
import { Spinner } from 'reactstrap';
import { Redirect } from 'react-router';

export default class DeleteNotification extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    componentDidMount = async () => {
        await axios.delete("http://localhost:8080/deleteNotification/"+this.props.match.params.id)
        .then((res) => {
            this.setState({ loading: false });  
        }) 
    }
    
    render(){
        if(this.state.loading){
            return(
                <React.Fragment>
                    <div className="middle">
                        <Spinner color="info" style={{ width: '100', height: '100' }}/>
                    </div>
                </React.Fragment>
            );
        }
        else{
            return <Redirect push to="/admin/notifications" />;
        }
    }  
}
 