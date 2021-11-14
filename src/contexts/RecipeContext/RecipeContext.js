import React, { createContext, useContext } from 'react';
import useResource from '../../hooks/useResource';

export const recipeContext = createContext({});

export const useRecipeContext = () => useContext(recipeContext);

export default function RecipeContextProvider({ children }) {
    const { loading, error, value } = useResource('http://localhost:3005/api/recipes');

    return (
        <recipeContext.Provider value={{ loading, error, data: value }}>
            {children}
        </recipeContext.Provider>
    )
}