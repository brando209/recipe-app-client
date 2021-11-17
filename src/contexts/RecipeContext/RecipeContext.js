import React, { createContext, useContext } from 'react';
import useResource from '../../hooks/useResource';
import recipeApi from '../../api/recipes';

export const recipeContext = createContext({});

export const useRecipeContext = () => useContext(recipeContext);

export default function RecipeContextProvider({ children }) {
    const { loading, error, value } = useResource('http://localhost:3005/api/recipes');

    const createRecipe = async (recipeInfo, callback) => {
        try {
            const recipe = await recipeApi.createRecipe(recipeInfo);
            callback(recipe.data, null);
        } catch(err) {
            console.error("Error:", err);
            callback(null, err);
        }
    }

    return (
        <recipeContext.Provider value={{ loading, error, data: value, createRecipe }}>
            {children}
        </recipeContext.Provider>
    )
}