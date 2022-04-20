import { useState, useEffect, useRef } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { Search as SearchIcon } from 'react-bootstrap-icons';
import styled from 'styled-components';
import Button from '../Button/Button';

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
            <Button className={`clear-btn ${showClearBtn ? "show" : ""}`} onClick={handleClear}>x</Button>
            <Button type="submit" className="search-button"><SearchIcon width={15} height={15} /></Button>
        </StyledSearch>
    )
}

const StyledSearch = styled(Form)`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: right;
    align-items: center;   

    .search-bar {
        max-width: 300px;
        max-height: 2.2rem; 
    }

    .clear-btn {
        display: none;
        border-left: none;

        background: ${props => props.theme.contrast};
        border: 1px solid ${props => props.theme.accent};
        color: ${props => props.theme.main}
    }

    .clear-btn.show {
        display: inline;
    }

    .search-button {
        margin-left: 10px;
    }
`

export default Search;