import React from 'react';
import Button from 'react-bootstrap/Button'

export default function SelectInput({ children, options, placeholder, ...props }) {
    return (
        <Button as="select" {...props} >
            { placeholder && <option value="">{placeholder}</option>}
            { options ? options.map(option => (<option key={option} value={option}>{option}</option>)) : children }
        </Button>
    )
}