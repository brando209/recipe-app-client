import React from 'react';
import { HeartFill } from 'react-bootstrap-icons';
import './Heart.css';

function Heart() {
    return (
        <div className="heart-icon-spinner-container">
            <HeartFill className='heart-icon-spinner'/>
        </div>
    )
}

export default Heart;