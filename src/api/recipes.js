import axios from 'axios';

const recipeURL = "http://localhost:3005/api/recipes"

function createRecipe(recipeInfo, headers) {
    return axios.post(recipeURL, recipeInfo, { headers });
}

function updateRecipe(recipeId, updates, headers) {
    return axios.patch(`${recipeURL}/${recipeId}`, updates, { headers });
}

function deleteRecipe(recipeId, headers) {
    return axios.delete(`${recipeURL}/${recipeId}`, { headers });
}

export default {
    createRecipe, updateRecipe, deleteRecipe
}