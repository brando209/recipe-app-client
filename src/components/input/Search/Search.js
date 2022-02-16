import { useState, useEffect, useRef } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { Search as SearchIcon } from 'react-bootstrap-icons';
import styled from 'styled-components';

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
        <StyledSearch onSubmit={handleSubmit}>
            <FormControl
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="search-bar"
                onKeyPress={handleKeyPress}
                onChange={handleInputChange}
                ref={inputRef}
            />
            <Button className={`clear-btn ${showClearBtn ? "show" : ""}`} variant="outline-secondary" onClick={handleClear}>x</Button>
            <Button variant="secondary" type="submit" className="ms-2"><SearchIcon width={10} height={10} /></Button>
        </StyledSearch>
    )
}

const StyledSearch = styled(Form)`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: right;

    .search-bar {
        max-width: 300px;   
    }

    .clear-btn {
        display: none;
        background: white;
    }

    .clear-btn.show {
        display: inline;
    }

`

export default Search;