import React, { useState } from 'react';
import axios from "axios";
import { Button } from 'semantic-ui-react'
// import ViewForums from './ViewForums';

const SEButton = (props) => {
    const {
       id
    } = props;

    const [status, setStatus] = useState(true);

    const toggle = () => setStatus(!status);

    const buttonfunc = async() => {
        {status ? 
            axios.post("http://localhost:8080/sendForumID/" +props.id)
                .then(response => {
                    {toggle()}
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
            })
        :
        axios.post("http://localhost:8080/endForumID/" +props.id)
            .then(response => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
        })
        }
    }

    React.useEffect(() => {
        const data = localStorage.getItem(props.id);
        if(data) {
            setStatus(JSON.parse(data));
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem(props.id, JSON.stringify(status));
    });

    return(
        <div>
            <Button color={status ? props.color1 : props.color2} onClick={() => buttonfunc()}>{status ? props.name1 : props.name2}</Button>
        </div>
    );
}

export default SEButton;