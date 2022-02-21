import { FieldArray } from 'formik';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export default function InputList({ name, label, listItems, renderItem, initialItemValue, buttonPlacement="top", buttonText="Add", buttonVariant="secondary" }) {
    return (
        <FieldArray
            name={name}
            render={arrayHelpers => (
                <StyledInputList buttonPlacement={buttonPlacement}>
                    {label && <span className="label-container">
                        <label htmlFor={name}>{label}</label>{": "}
                    </span>}
                    <div className="add-btn-container">
                        <Button
                            type="button"
                            size="sm"
                            variant={buttonVariant}
                            onClick={() => arrayHelpers.push(initialItemValue)}
                        >
                            {buttonText}
                        </Button>
                    </div>
                    <ListContainer>
                        {listItems.map((item, index) => (
                            renderItem(item, index, arrayHelpers)
                        ))}
                    </ListContainer>
                </StyledInputList>
            )}
        />
    );
}

const StyledInputList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0.5rem auto;

    .label-container {
        display: flex;
        justify-content: flex-start;
        font-weight: bold;
        flex: 0.4;
        order: 0;
    }
    
    .add-btn-container {
        max-width: 450px;
        text-align: left;
        margin-left: 0.25rem;
        flex: 1;
        order: ${({ buttonPlacement }) => (buttonPlacement === "bottom" ? 3 : 1)};
    }

    @media (min-width: 428px) {
        .add-btn-container {
            margin-left: 2rem;
        }
        .label-container {
            justify-content: flex-end;
            flex: 0.3;
        }
    }

    @media (min-width: 1024px) {
        .label-container {
            flex: 0.4;
        }
    }
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    order: 2;
    
    @media (min-width: 428px) {
        padding-left: 6rem;
    }

    @media (min-width: 768px) {
        padding-left: 8rem;
    }

    @media (min-width: 1024px) {
        padding-left: 15%;
    }
`