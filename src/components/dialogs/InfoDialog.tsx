import React from "react";
import {Button, Modal } from "react-bootstrap";

export interface InfoDialogProps {
    text: string,
    onClose: Function,
    isOpen: boolean,
}

const InfoDialog: React.FC<InfoDialogProps> = ({text, onClose, isOpen}) => {
    return (
        <Modal show={isOpen} onHide={onClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>{text}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onClose()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default InfoDialog;