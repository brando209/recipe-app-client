import React from 'react';
import { Offcanvas } from 'react-bootstrap';

function SlideinSidebar(props) {
    return (
        <Offcanvas show={props.show} onHide={props.onClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{props.title}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {props.children}
          </Offcanvas.Body>
        </Offcanvas>
    );
  }

  export default SlideinSidebar;