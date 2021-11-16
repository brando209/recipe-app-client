import React from 'react';
import Page from '../Page/Page';
import RecipeCard from '../../components/app/RecipeCard/RecipeCard';
import { useRecipeContext } from '../../contexts/RecipeContext/RecipeContext';

export default function Home() {
    const { data, loading, error } = useRecipeContext();

    return (
        <Page>
            Home page
            {loading && <p>Loading...</p>}
            {error && <pre>{JSON.stringify(error.message, null, 2)}</pre>}
            {!error && !loading && data.map(recipe => (
                <RecipeCard key={recipe.id} {...recipe} />
            ))}
        </Page>
    )   
}