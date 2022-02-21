import styled from 'styled-components';

function List({ 
    heading,
    listItems,
    renderItem,
    listStyle,
    type = "ul",
    direction = "vertical"
}) {
    const listItemComponents = listItems && listItems.map((item, index) => (
        <li key={index}>{typeof renderItem === "function" ? renderItem(item) : item}</li>
    ));

    const style = {
        ...listStyle,
        display: "flex",
        flexDirection: `${direction === "horizontal" ? "row" : "column"}`
    }

    return (
        <StyledList>
            <h3>{heading}</h3>
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
        </StyledList>
    )
}

export default List;

const StyledList = styled.div`
    > h3, > ul, > ol {
        text-align: left;
    }

    > ul, > ol {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
`