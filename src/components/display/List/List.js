import React from 'react';
import './List.css';

function List({ 
    heading,
    listItems,
    renderItem,
    style,
    type = "ul",
    direction = "vertical"
}) {
    const listItemComponents = listItems && listItems.map((item, index) => (
        <li key={index}>{typeof renderItem === "function" ? renderItem(item) : item}</li>
    ));

    return (
        <div className="list-container">
            <h3>{heading}</h3>
            <div className="list">
                {(listItems && listItems.length > 0) ?
                    (type === "ul") ?
                        <ul style={style}>
                            {listItemComponents}
                        </ul> :
                        <ol style={style}>
                            {listItemComponents}
                        </ol>
                    :
                    <p>This list is currently empty</p>
                }
            </div>
        </div>
    )
}

export default List;