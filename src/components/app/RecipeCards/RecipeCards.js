import styled from "styled-components"
import { Link } from 'react-router-dom'
import RecipeCard from "../RecipeCard/RecipeCard";

function RecipeCards({ recipes, onFavorite }) {
    if(!recipes || recipes.length === 0) return (
        <>
            <p>You currently have no saved recipes.</p>
            <p><Link to="/new">Click here</Link> to add a new recipe.</p>
        </>
    );

    return (
        <RecipeCardContainer>
            {recipes?.map(recipe => (
                <RecipeCard key={recipe.id} {...recipe} onFavorite={onFavorite} />
            ))}
        </RecipeCardContainer>
    )
}

export default RecipeCards

const RecipeCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
`