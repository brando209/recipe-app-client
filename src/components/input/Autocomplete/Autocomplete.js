import React, { useState } from 'react';
import { FormControl } from 'react-bootstrap';
import './Autocomplete.css';

function Autocomplete({ suggestions, placeholder, onSubmit }) {
    const [userInput, setUserInput] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestion, setActiveSuggestion] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // useEffect(() => {
    //     console.group("Autocomplete State and Props");
    //     console.log("User input:", userInput);
    //     console.log("Filtered suggestions:", filteredSuggestions);
    //     console.log("Active suggestion:", activeSuggestion);
    //     console.log("Show:", showSuggestions);
    //     console.log("Suggestions:", suggestions);
    //     console.groupEnd();
    // }, [userInput, filteredSuggestions, activeSuggestion, showSuggestions, suggestions]);

    const handleSubmit = (submitValue) => {
        if(!onSubmit) return;
        if(submitValue) {
            onSubmit(submitValue);
        } else {
            const suggIdx = filteredSuggestions.findIndex(item => item.name.toLowerCase() === userInput.toLowerCase());
            if(suggIdx > -1) onSubmit(filteredSuggestions[suggIdx]);
        }
    }

    const handleChange = e => {
        const input = e.currentTarget.value;

        const newFilteredSuggestions = suggestions.filter(suggestion =>
            suggestion.name.toLowerCase().indexOf(input.toLowerCase()) > -1
        );

        setActiveSuggestion(-1);
        setFilteredSuggestions(newFilteredSuggestions);
        
        //Show suggestions if input has not changed to empty string
        if(input !== "" ) setShowSuggestions(true);
        else setShowSuggestions(false);

        setUserInput(input);
    };

    const handleKeyDown = e => {
        const keyCode = e.keyCode;

        if (keyCode === 13) {
            e.preventDefault();
            if(activeSuggestion === -1 && userInput === "") return;
            if(activeSuggestion > -1) {
                handleSubmit(filteredSuggestions[activeSuggestion])
            } else handleSubmit();
            setActiveSuggestion(-1);
            setShowSuggestions(false);
            setUserInput("");
        } else if (keyCode === 38) {
            if (activeSuggestion === 0 || !showSuggestions) return;
            setActiveSuggestion(prevActiveSuggestion => prevActiveSuggestion - 1);
        } else if (keyCode === 40) {
            if (activeSuggestion + 1 === filteredSuggestions.length || !showSuggestions) return;
            setActiveSuggestion(prevActiveSuggestion => prevActiveSuggestion + 1);
        }
    };

    const handleClick = e => {
        const clickedSuggestion = { id: e.currentTarget.value, name: e.currentTarget.innerText };
        setActiveSuggestion(-1);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setUserInput("");
        handleSubmit(clickedSuggestion);
    };

    const suggestionsListComponent = (showSuggestions && userInput !== "") ?
        ((filteredSuggestions.length) ? (
            <ul className="suggestions-list">
                {filteredSuggestions.map((suggestion, index) => {
                    let className;

                    // Flag the active suggestion with a class
                    if (index === activeSuggestion) {
                        className = "suggestion-active";
                    }
                    return (
                        <li className={className} key={suggestion.id} value={suggestion.id} onClick={handleClick}>
                            {suggestion.name}
                        </li>
                    );
                })}
            </ul>
        ) : (
            <div className="no-suggestions">
                <em>No suggestions available.</em>
            </div>
        )
        ) : null

    return (
        <div className="autocomplete-container">
            <FormControl
                className="autocomplete-input-bar"
                type="search"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={userInput}
                placeholder={placeholder}
            />
            {suggestionsListComponent}
        </div>
    );
}

export default Autocomplete;