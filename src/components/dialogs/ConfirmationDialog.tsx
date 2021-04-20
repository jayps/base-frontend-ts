import React from "react";
import {Button, Modal } from "react-bootstrap";

export interface ConfirmationDialogButton {
    text?: string,
    action: any // TODO: Figure out why I can't use MouseEvent here.
}

export interface ConfirmationDialogProps {
    prompt: string,
    yesButton: ConfirmationDialogButton,
    noButton: ConfirmationDialogButton,
    isOpen: boolean,
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({prompt, yesButton, noButton, isOpen}) => {
    return (
        <Modal show={isOpen} onHide={noButton.action} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>{prompt}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={noButton.action}>
                    Close
                </Button>
                <Button variant="primary" onClick={yesButton.action}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationDialog;