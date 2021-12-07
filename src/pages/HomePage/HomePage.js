import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import Page from '../Page/Page';
import RecipeCard from '../../components/app/RecipeCard/RecipeCard';
import { useRecipeContext } from '../../contexts/RecipeContext/RecipeContext';

export default function HomePage() {
    const { data: recipes, updateRecipe, loading, error } = useRecipeContext();

    const handleFavorite = (recipeId, isFavorite) => {
        updateRecipe(recipeId, { favorite: !isFavorite }, () => console.log("toggled favorite"));
    }

    return (
        <Page>
            <h1>Home</h1>
            {loading && <p>Loading...</p>}
            {error && <pre>{JSON.stringify(error.message, null, 2)}</pre>}
            {!error && !loading && recipes.length > 0 && 
                <Row>
                    {recipes.map(recipe => (
                        <Col sm="12" md="6" className="recipe-card-container" key={recipe.id}><RecipeCard {...recipe} onFavorite={handleFavorite} /></Col>
                    ))}
                </Row>
            }
            {!error && !loading && recipes.length === 0 && 
                <>
                    <p>You currently have no saved recipes.</p>
                    <p><Link to="/new">Click here</Link> to add a new recipe.</p>
                </>
            }
        </Page>
    )   
}