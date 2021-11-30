import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import './Search.css';

function Search({ onSubmit, initialValue }) {
    const inputRef = useRef(null);
    const [showClearBtn, setShowClearBtn] = useState(initialValue && initialValue.length > 0);

    useEffect(() => {
        inputRef.current.value = initialValue;
    }, [initialValue]);

    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            inputRef.current.blur();
            typeof onSubmit === "function" && onSubmit(inputRef.current.value);
        }
    }

    const handleInputChange = (e) => {
        if(e.target.value.length > 0) setShowClearBtn(true);
        else setShowClearBtn(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        typeof onSubmit === "function" && onSubmit(inputRef.current.value);
    }

    const handleClear = () => {
        inputRef.current.value = "";
        setShowClearBtn(false);
        typeof onSubmit === "function" && onSubmit("");
    }

    return (
        <Form className="search-form" onSubmit={handleSubmit}>
            <FormControl
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="search-bar"
                onKeyPress={handleKeyPress}
                onChange={handleInputChange}
                ref={inputRef}
            />
            <Button className={`clear-btn ${showClearBtn ? "show" : "hide"}`} variant="outline-secondary" onClick={handleClear}>x</Button>
            <Button variant="secondary" type="submit" className="mx-2">Search</Button>
        </Form>
    )
}

export default Search;