import axios from 'axios';

function createRecipe(recipeInfo, headers) {
    return axios.post("/api/recipes", recipeInfo, { headers });
}

function updateRecipe(recipeId, updates, headers) {
    return axios.patch(`/api/recipes/${recipeId}`, updates, { headers });
}

function deleteRecipe(recipeId, headers) {
    return axios.delete(`/api/recipes/${recipeId}`, { headers });
}

const recipesApi = {
    createRecipe, updateRecipe, deleteRecipe
}
export default recipesApi;