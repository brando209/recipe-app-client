import Page from '../Page/Page';
import { useRecipeContext } from '../../contexts/RecipeContext/RecipeContext';
import RecipeCards from '../../components/app/RecipeCards/RecipeCards';

export default function HomePage() {
    const { data: recipes, updateRecipe, loading, error } = useRecipeContext();

    const handleFavorite = (recipeId, isFavorite) => {
        updateRecipe(recipeId, { favorite: !isFavorite }, () => console.log("toggled favorite"));
    }

    return (
        <Page>
            <h1>Home</h1>
            {loading && <p>Loading...</p>}
            {error && <pre>{JSON.stringify(error.message, null, 2)}</pre>}
            {!error && !loading && <RecipeCards onFavorite={handleFavorite} recipes={recipes} />}
        </Page>
    )   
}
