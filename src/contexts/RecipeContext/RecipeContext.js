import React, { createContext, useContext, useState } from 'react';
import useResource from '../../hooks/useResource';
import recipeApi from '../../api/recipes';

export const recipeContext = createContext({});

export const useRecipeContext = () => useContext(recipeContext);

export default function RecipeContextProvider({ children }) {
    const { loading, error, value } = useResource('http://localhost:3005/api/recipes');
    const [filter, setFilter] = useState({ ingredients: [], search: "" });

    const applyFilter = (filter) => {
        const { ingredients, search } = filter;

        let result = value;

        //Filter by ingredients, result will include recipes that have all ingredients
        if(ingredients) {
            for(let ingredient of ingredients) {
                result = result?.filter(recipe => {
                    const index = recipe.ingredients.findIndex(ing => ing.id === ingredient.id)
                    return index > -1;
                });
            }
        }

        //Filter out recipes that do not contain the search text
        if(search) {
            const searchText = search.toLowerCase();
            result = result?.filter(recipe => (
                recipe.title.toLowerCase().includes(searchText)
                || recipe.description.toLowerCase().includes(searchText)
                || recipe.ingredients.map(ing => ing.name).join(" ").toLowerCase().includes(searchText)
                || recipe.instructions.join(" ").toLowerCase().includes(searchText)
                || recipe.comments?.join(" ").toLowerCase().includes(searchText)
            ));
        }

        return result;
    }

    const updateFilter = (filter) => {
        setFilter(prev => ({ ...prev, ...filter}));
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
        <recipeContext.Provider value={{ loading, error, data: filteredValue, createRecipe, updateFilter, filter }}>
            {children}
        </recipeContext.Provider>
    )
}