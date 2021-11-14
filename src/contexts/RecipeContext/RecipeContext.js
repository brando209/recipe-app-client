import React, { createContext, useContext } from 'react';

export const recipeContext = createContext({});

export const useRecipeContext = () => useContext(recipeContext);

export default function RecipeContextProvider({ children }) {
    const { loading, error, value } = { loading: false, error: null, value: []}; //Fetch some data from api here

    return (
        <recipeContext.Provider value={{ loading, error, data: value }}>
            {children}
        </recipeContext.Provider>
    )
}