import React, { createContext, useContext, useState } from 'react';
import useResource from '../../hooks/useResource';
import recipeApi from '../../api/recipes';
import { useAuth } from '../AuthContext/AuthContext';

export const recipeContext = createContext({});

export const useRecipeContext = () => useContext(recipeContext);

const authHeader = (token) => ({ Authorization: `BEARER ${token}`});

export default function RecipeContextProvider({ children }) {
    const auth = useAuth();
    const { loading, error, value, setValue } = useResource(
        '/api/recipes',
        { headers: { authorization: `BEARER ${auth.user?.token}` } },
        [auth.user?.token]
    );
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
    
    const createRecipe = async (recipeInfo, callback = () => {}) => {
        try {
            //Make api call
            const recipe = await recipeApi.createRecipe(recipeInfo, authHeader(auth.user.token));
            //Update state with returned data
            setValue(prevValue => ([...prevValue, recipe.data]));
            callback(recipe.data, null);
        } catch(err) {
            console.error("Error:", err);
            callback(null, err);
        }
    }

    const updateRecipe = async (recipeId, updates, callback = () => {}) => {
        try {
            //Make api call
            const recipe = await recipeApi.updateRecipe(recipeId, updates, authHeader(auth.user.token));
            //Update state with returned data
            setValue(prevValue => {
                const newValue = [...prevValue];
                const updatedIndex = newValue.findIndex(value => value.id === recipe.data.id);
                if(updatedIndex > -1) newValue.splice(updatedIndex, 1, recipe.data);
                return newValue;
            })
            callback(recipe.data, null);
        } catch(err) {
            console.error("Error:", err);
            callback(null, err);
        }
    }

    const deleteRecipe = async (recipeId, callback = () => {}) => {
        try {
            //Make api call
            await recipeApi.deleteRecipe(recipeId, authHeader(auth.user.token));
            //Remove recipe from state
            setValue(prevValue => {
                const newValue = [...prevValue];
                const deletedIndex = newValue.findIndex(value => value.id === recipeId);
                if(deletedIndex > -1) newValue.splice(deletedIndex, 1);
                return newValue;
            })
            callback(true, null);
        } catch(err) {
            console.error("Error:", err);
            callback(null, err);
        }
    }

    const filteredValue = applyFilter(filter);
    
    return (
        <recipeContext.Provider value={{ loading, error, data: filteredValue, createRecipe, updateRecipe, deleteRecipe, updateFilter, filter }}>
            {children}
        </recipeContext.Provider>
    )
}