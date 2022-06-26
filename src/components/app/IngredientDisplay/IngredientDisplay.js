import styled from 'styled-components';

function IngredientDisplay({ ingredient }) {
    const { name, quantity, unit, size, comment } = ingredient;

    const formatQuantity = () => {
        if(!quantity) return "";
        if(Number(quantity) % 1 === 0) return `${quantity} `;

        const quantityFractionMap = {
            '0.125':  "1/8",
            '0.250':  "1/4",
            '0.330':  "1/3",
            '0.375':  "3/8",
            '0.500':  "1/2",
            '0.625':  "5/8",
            '0.660':  "2/3",
            '0.750':  "3/4",
            '0.875':  "7/8",
        }

        return `${Math.floor(quantity) > 0 ? Math.floor(quantity) : ""} ${quantityFractionMap[parseFloat(quantity % 1).toFixed(3)]} `;
    }
    
    const formatUnit = () => {
        if(!unit) return "";
        if(Number(quantity) > 1) return `${unit}s `
        return `${unit} `;
    }
    
    const formatName = () => name.trim();
    const formatSize = () => size ? `, ${size}` : "";
    const formatComment = () => comment ? ` (${comment})` : "";

    return (
        <StyledIngredientDisplay>
            <span id="display-quantity">{formatQuantity()}</span>
            <span id="display-unit">{formatUnit()}</span>
            <span id="display-name">{formatName()}</span>
            <span id="display-size">{formatSize()}</span>
            <span id="display-comment">{formatComment()}</span>
        </StyledIngredientDisplay>
    )
}

const StyledIngredientDisplay = styled.div`
    width: 100%;
    text-align: left;
    margin-bottom: 0.5rem;

    #display-quantity, #display-unit {
        font-weight: 500;
    }

    #display-name, #display-size, #display-comment {
        font-style: italic;
    }

    #display-comment {
        color: #6f6f6f;
    }

`

export default IngredientDisplay;