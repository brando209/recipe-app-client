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
        true,
        [auth.user?.token]
    );
    const [filter, setFilter] = useState({ ingredients: [], categories: [], search: "" });

    const applyFilter = (filter) => {
        const { ingredients, categories, search } = filter;
        const isFiltering = ingredients.length > 0 || categories.length > 0;
        //Attach a score variable to each recipe
        let result = value?.map(val => ({ ...val, _score: 0 }));

        //Filter by ingredients. For every inredient in filter, add 1 to recipe score if recipe contains this ingredient
        for(let ingredient of ingredients) {
            const ingredientName = ingredient.name.toLowerCase();
            result = result?.map(recipe => {
                for(let ing of recipe.ingredients) {
                    if(ing.name.toLowerCase().includes(ingredientName)) recipe._score += 2;
                }
                if(recipe.title.toLowerCase().includes(ingredientName)) recipe._score += 3;
                if(recipe.description.toLowerCase().includes(ingredientName)) recipe._score += 2;
                return recipe;
            });
        }

        //Filter by categories, For every category in filter, add 1 to recipe score if recipe contains this category
        for(let category of categories) {
            const categoryName = category.name.toLowerCase();
            result = result?.map(recipe => {
                for(let cat of recipe.categories) {
                    if(cat.name.toLowerCase().includes(categoryName)) recipe._score += 3;
                }
                if(recipe.title.toLowerCase().includes(categoryName)) recipe._score += 5;
                if(recipe.description.toLowerCase().includes(categoryName)) recipe._score += 4;

                return recipe;
            });
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
                || recipe.categories.map(cat => cat.name).join(" ").toLowerCase().includes(searchText)
            ));
        }

        //Filter out recipes which still have a score of 0
        if(isFiltering) {
            result = result?.filter(recipe => recipe._score > 0);
            result = result?.sort((a, b) => b._score - a._score);
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