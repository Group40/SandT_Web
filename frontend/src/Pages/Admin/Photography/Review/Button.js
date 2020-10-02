import React, { useState } from 'react';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {   Button } from 'semantic-ui-react'
import ZoomPic from "../GlobalGallery/ZoomPic";
import axios from "axios";

const ModalButton = (props) => {

  const {
    //buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  const deletefun = async() => {

      {modal ?
          await axios.delete("http://localhost:8080/deletepic/"+props.id)
              .then(res => {
                  {toggle()}
              })
          :
          await axios.delete("http://localhost:8080/deletepic/"+props.id)
              .then(res => {
                  {toggle()}//this.pagingfun()
              })
      }



    }

  return (

    <div>
      <Button color={props.color2} style={{float: 'right'}} onClick={() => {deletefun()}}>
          {modal ? "Start" :"End"}
      </Button>{' '}



      {/*<Modal isOpen={modal} fade={false} toggle={toggle} className={className}>*/}
      {/*  <ModalHeader toggle={toggle}>Do you really want to delete this image2 ? </ModalHeader>*/}
      {/*  <ModalBody>*/}
      {/*    <ZoomPic url ={props.url}/>*/}
      {/*  </ModalBody>*/}
      {/*  <ModalFooter>*/}
      {/*    <Button color={props.color} onClick={deletefun}>Delete</Button>{' '}*/}
      {/*    <Button color="blue" onClick={toggle}>Cancel</Button>*/}
      {/*  </ModalFooter>*/}
      {/*</Modal>*/}
    </div>
  );
}

export default ModalButton;