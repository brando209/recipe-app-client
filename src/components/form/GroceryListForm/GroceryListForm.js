import { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import InputList from '../../input/InputList/InputList';
import { XSquare } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';

function GroceryListForm({
    groceryItems,
    onItemAdd,
    onItemCheck,
    onItemEdit,
    onItemRemove
}) {
    const [editing, setEditing] = useState({ id: null, original: null });
    const inputRef = useRef(null);
    const buttonRef = useRef(null);

    const handleFieldBlur = (e) => {
        if(editing.id) {
            onItemEdit && e.target.value !== editing.original && onItemEdit(Number(e.target.id), e.target.value)
            setEditing({ id: null, original: null });
            return;
        }
        if(e.target.value.trim() === "") return;
        onItemAdd && onItemAdd(e.target.value);
    }

    const handleSubmit = useCallback(async values => {
        if(buttonRef.current.disabled) return;
        buttonRef.current.disabled = true;
        if(editing.id) {
            const editedItem = values.items.find(item => item.id === editing.id);
            onItemEdit && editedItem.name !== editing.original && onItemEdit(editedItem.id, editedItem.name);
            setEditing({ id: null, original: null });
            buttonRef.current.disabled = false;
            return;
        }
        const newItem = values.items.find(item => !item.id);
        if(!newItem) return;
        onItemAdd && await onItemAdd(newItem.name);
        buttonRef.current.disabled = false;
        buttonRef.current.click();
    }, [editing.id, editing.original, onItemAdd, onItemEdit]);

    //TODO: useCallack instead of ref and useEffect
    useEffect(() => {
        if(inputRef.current) inputRef.current.focus();
    }, [inputRef.current]);
    
    const handleNewItem = (addNewItem) => {
        if(!inputRef.current) {
            addNewItem();
        }
    }

    const handleItemRemove = (itemId) => {
        onItemRemove && onItemRemove(itemId);
    }

    const handleEditing = (itemId, originalValue) => {
        setEditing({ id: itemId, original: originalValue });
    }
    
    return (
        <Formik
            initialValues={{ items: groceryItems || [] }}
            enableReinitialize={true}
            onSubmit={handleSubmit}
        >{({ values }) => (
            <Form>
                <InputList
                    name="items"
                    listItems={values.items}
                    initialItemValue={{ complete: false, name: "" }}
                    renderItem={(item, index, arrayHelpers) => (
                        <GroceryListItem key={item.id || `new-${index}`} id={item.id}>
                            <Field name={`items.${index}.complete`} type="checkbox" onClick={e => onItemCheck(item.id, item.complete)} />
                            {item.id && editing.id !== item.id ?
                                <div onClick={() => handleEditing(item.id, item.name)}>{item.name}</div>
                                :
                                <Field innerRef={input => { inputRef.current = input; input && input.focus(); }} id={item.id} name={`items.${index}.name`} type="input" placeholder={`Item #${index + 1}`} onBlur={e => handleFieldBlur(e)} />
                            }
                            <XSquare onClick={() => { handleItemRemove(item.id); arrayHelpers.remove(index); } } />
                        </GroceryListItem>
                    )}
                    buttonPlacement="bottom center"
                    renderButton={addNewItem => (
                        <Button ref={buttonRef} variant="outline-secondary" type="button" onClick={() => handleNewItem(addNewItem)}>Add Grocery Item</Button>
                    )}
                />
            </Form>
        )}</Formik>
    )
}

export default GroceryListForm

const GroceryListItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem auto;
    gap: 10px;

    >:nth-child(2) {
        width: 10rem;
        text-align: left;
    }

    > input {
        width: 100%;
    }

    > input:first-child {
        flex: 1;
        height: 2rem;
    }

    > input:first-child:hover {
        cursor: pointer;
    }

    >input:nth-child(2) {
        flex: 10;
    }

    > svg {
        color: var(--color-red);
        font-size: 2rem;
    }
    
    > svg:hover {
        cursor: pointer;
    }
`