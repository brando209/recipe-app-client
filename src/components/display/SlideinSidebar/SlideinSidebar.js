import React from 'react';
import styled from 'styled-components';
import { Offcanvas } from 'react-bootstrap';

function SlideinSidebar(props) {
    return (
        <StyledOffcanvas show={props.show} onHide={props.onClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{props.title}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {props.children}
          </Offcanvas.Body>
        </StyledOffcanvas>
    );
  }

  const StyledOffcanvas = styled(Offcanvas)`
    background-color: ${props => props.theme.contrast}
  `

  export default SlideinSidebar;