import React from 'react';
import { useRecipeContext } from '../../contexts/RecipeContext/RecipeContext';

export default function Home() {
    const { data, loading, error } = useRecipeContext();

    return (
        <div>
            Home page
            {loading && <p>Loading...</p>}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )   
}