import axios from 'axios';

const recipeURL = "http://localhost:3005/api/recipes"

function createRecipe(recipeInfo) {
    return axios.post(recipeURL, recipeInfo);
}

function updateRecipe(recipeId, updates) {
    return axios.patch(`${recipeURL}/${recipeId}`, updates);
}

function deleteRecipe(recipeId) {
    return axios.delete(`${recipeURL}/${recipeId}`);
}

export default {
    createRecipe, updateRecipe, deleteRecipe
}