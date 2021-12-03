import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDialogContext } from '../../../contexts/DialogContext/DialogContext';

export default function Dialog(props) {
    const { dialog, show, setShow } = useDialogContext();

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{dialog.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{dialog.text}</p>
            </Modal.Body>

            <Modal.Footer>
                {dialog.footer}
            </Modal.Footer>
        </Modal>
    )
}