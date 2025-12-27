import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SocialShare from "./SocialShare";

export default function ShareDialog(props) {
  const handleClose = () => {
    props.sendConfirmationToParent(false);
  };
  return (
    <>
      <Modal show={props.open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{"Share"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SocialShare description={props.description} inputs={props.inputs}></SocialShare>
        </Modal.Body>
      </Modal>
    </>
  );
}
