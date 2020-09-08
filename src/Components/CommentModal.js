import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Form, FormGroup, Input} from 'reactstrap';

const CommentModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="secondary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Leave a comment</ModalHeader>
        <ModalBody>
          <Form onSubmit={event => props.submitHandler(event)}>
            <FormGroup>
              <Input value={props.comment} onChange={event => props.changeHandler(event)} type="textarea" name="text" id="exampleText"/>
            </FormGroup>
            <Button color="primary">Submit</Button>
          </Form>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter> */}
      </Modal>
    </div>
  );
}

export default CommentModal;