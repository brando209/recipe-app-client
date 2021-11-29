import React, { createContext, useContext, useState } from 'react';
import useResource from '../../hooks/useResource';
import recipeApi from '../../api/recipes';

export const recipeContext = createContext({});

export const useRecipeContext = () => useContext(recipeContext);

export default function RecipeContextProvider({ children }) {
    const { loading, error, value } = useResource('http://localhost:3005/api/recipes');
    const [filter, setFilter] = useState({ ingredients: [] });

    const applyFilter = (filter) => {
        const { ingredients } = filter;

        let result = value;

        //Filter by ingredients, result will include recipes that have all ingredients
        if(ingredients) {
            for(let ingredient of ingredients) {
                result = result.filter(recipe => {
                    const index = recipe.ingredients.findIndex(ing => ing.id === ingredient.id)
                    return index > -1;
                });
            }
        }

        return result;
    }

    
    const createRecipe = async (recipeInfo, callback) => {
        try {
            const recipe = await recipeApi.createRecipe(recipeInfo);
            callback(recipe.data, null);
        } catch(err) {
            console.error("Error:", err);
            callback(null, err);
        }
    }

    const filteredValue = applyFilter(filter);
    
    return (
        <recipeContext.Provider value={{ loading, error, data: filteredValue, createRecipe, updateFilter: setFilter, filter }}>
            {children}
        </recipeContext.Provider>
    )
}