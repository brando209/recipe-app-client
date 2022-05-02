import { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import InputList from '../../input/InputList/InputList';
import { XSquare } from 'react-bootstrap-icons';
import Button from '../../input/Button/Button';

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

    const handleFieldBlur = useCallback(async (e) => {
        const id = e.target.id;
        const value = e.target.value;
        if(editing.id) {
            onItemEdit && value !== editing.original && await onItemEdit(Number(id), value)
            setEditing({ id: null, original: null });
            return;
        }
        if(value.trim() === "") return;

        onItemAdd && await onItemAdd(value);

    }, [editing, onItemAdd, onItemEdit]);

    const handleSubmit = useCallback(async values => {
        if(buttonRef.current.disabled) return;
        buttonRef.current.disabled = true;

        inputRef.current && inputRef.current.removeEventListener('blur', handleFieldBlur);

        if(editing.id) {
            const editedItem = values.items.find(item => item.id === editing.id);
            onItemEdit && editedItem.name !== editing.original && onItemEdit(editedItem.id, editedItem.name);
            setEditing({ id: null, original: null });
            buttonRef.current.disabled = false;
            return;
        }
        const newItem = values.items.find(item => !item.id);
        if(!newItem) return;
        onItemAdd && await onItemAdd(newItem.name, () => {
            buttonRef.current.disabled = false;
            buttonRef.current.click();
            inputRef.current.focus();
        });
    }, [editing, onItemAdd, onItemEdit, handleFieldBlur]);

    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.addEventListener('blur', handleFieldBlur);
            inputRef.current.focus();
            return () => inputRef.current && inputRef.current.removeEventListener('blur', handleFieldBlur);
        }
    }, [editing, handleFieldBlur]);
    
    const handleNewItem = async (addNewItem) => {
        if(!inputRef.current) {
            addNewItem();
            setTimeout(() => inputRef.current?.focus(), 50);
            setEditing({ id: null, original: null });
            return;
        }
        onItemAdd && await onItemAdd(inputRef.current.value);
    }

    const handleItemRemove = async (itemId) => {
        onItemRemove && await onItemRemove(itemId);
        if(buttonRef.current) buttonRef.current.disabled = false;
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
                    initialItemValue={{ complete: false, name: "", id: null }}
                    renderItem={(item, index, arrayHelpers) => (
                        <GroceryListItem key={item.id || `new-${index}`} id={item.id}>
                            <Field name={`items.${index}.complete`} type="checkbox" onClick={e => onItemCheck(item.id, item.complete)} disabled={!item.id} />
                            {editing.id !== item.id ?
                                <div onClick={() => handleEditing(item.id, item.name)}>{item.name}</div>
                                :
                                <Field innerRef={input => { inputRef.current = input; }} id={item.id} name={`items.${index}.name`} type="input" placeholder={`Item #${index + 1}`} />
                            }
                            <XSquare onClick={() => { handleItemRemove(item.id); arrayHelpers.remove(index); } } />
                        </GroceryListItem>
                    )}
                    buttonPlacement="bottom center"
                    renderButton={addNewItem => (
                        <Button ref={button => buttonRef.current = button} variant="secondary" type="button" onClick={() => handleNewItem(addNewItem)}>Add Grocery Item</Button>
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