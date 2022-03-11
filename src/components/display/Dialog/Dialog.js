import React from 'react';
import { Modal } from 'react-bootstrap';
import { useAppContext } from '../../../contexts/AppContext/AppContext';

export default function Dialog(props) {
    const { dialog, hideDialog } = useAppContext();

    return (
        <Modal show={dialog.show} onHide={() => hideDialog()}>
            <Modal.Header closeButton>
                <Modal.Title>{dialog.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{dialog.text}</p>
                {dialog.body}
            </Modal.Body>

            <Modal.Footer>
                {dialog.footer}
            </Modal.Footer>
        </Modal>
    )
}