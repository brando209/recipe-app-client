import React from 'react';
import Container from 'react-bootstrap/Container';
import './Page.css';

export default function Page({ children, className = "", ...props }) {
    return (
        <Container className={`page ${className}`} {...props} fluid >
            { children }
        </Container>
    );
}