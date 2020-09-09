import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import CommentForm from './CommentForm'
import NewPostForm from'./NewPostForm'

const ModalForm = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button id="post-form-button" color="secondary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Leave a comment</ModalHeader>
        <ModalBody>
          {props.parentComponent === "commentContainer" 
          ? 
            <CommentForm postComment={props.postComment} toggle={toggle}/> 
          :
            <NewPostForm submitHandler={props.submitHandler} toggle={toggle}/>
          }
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalForm;