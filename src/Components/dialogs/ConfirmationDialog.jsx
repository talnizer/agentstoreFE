import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ConfirmationDialog(props) {
  const DELETE = "DELETE";
  const handleClose = () => {
    props.sendConfirmationToParent(false);
  };
  const handleConfirm = () => {
    props.sendConfirmationToParent(true);
  };
  return (
    <>
      <Modal show={props.open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-capitalize">{props?.inputs?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="general">{props?.inputs?.body}</div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="app-bg-color border border-dark"
            variant="1primary"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
