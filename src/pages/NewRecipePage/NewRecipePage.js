import React from 'react';
import Page from '../Page/Page';
import NewRecipeForm from '../../components/form/NewRecipeForm/NewRecipeForm';
import { useRecipeContext } from '../../contexts/RecipeContext/RecipeContext';
import { useNavigate } from 'react-router';

export default function NewRecipePage(props) {
    const { createRecipe } = useRecipeContext();
    const navigate = useNavigate();

    const handleCreateRecipe = (recipeInfo, callback) => {
        createRecipe(recipeInfo, (recipe, err) => {
            if(err) console.error(err);
            callback();
            navigate('/');
        });
    }

    return (
        <Page className="form-page">
            <h1>New Recipe</h1>
            <NewRecipeForm onSubmit={handleCreateRecipe}/>    
        </Page>
        
    );
}