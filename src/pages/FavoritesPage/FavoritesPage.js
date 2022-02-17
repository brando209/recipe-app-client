import Page from '../Page/Page';
import RecipeCards from '../../components/app/RecipeCards/RecipeCards';
import { useRecipeContext } from '../../contexts/RecipeContext/RecipeContext';

export default function FavoritesPage(props) {
    const { data: recipes, updateRecipe, loading, error } = useRecipeContext();

    //console.log(recipes) //TODO: Fix: logs <empty string> when no recipes (reason for extra check of length)
    const favoritedRecipes = recipes && recipes.length > 0 && recipes?.filter(recipe => recipe.favorite);

    const handleFavorite = (recipeId, isFavorite) => {
        updateRecipe(recipeId, { favorite: !isFavorite });
    }

    return (
        <Page>
            <h1>Favorites</h1>
            {loading && <p>Loading...</p>}
            {error && <pre>{JSON.stringify(error.message, null, 2)}</pre>}
            {!error && !loading && <RecipeCards onFavorite={handleFavorite} recipes={favoritedRecipes} />}
        </Page>
    )
}