import React, { useState } from 'react';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {   Button } from 'semantic-ui-react'

const ModalButton = (props) => {
  const {
    //buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color={props.color} style={{float: 'right'}} onClick={toggle}>
      {props.name}
      </Button>{' '}
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Are You Sure</ModalHeader>
        <ModalBody>
          Do you really want to delete this image ? 
        </ModalBody>
        <ModalFooter>
          <Button color={props.color} onClick={toggle}>Delete</Button>{' '}
          <Button color="blue" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalButton;