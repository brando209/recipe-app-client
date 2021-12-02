import axios from 'axios';

const recipeURL = "http://localhost:3005/api/recipes"

const headers = { authorization: `BEARER ${process.env.REACT_APP_USER_JWT}` }

function createRecipe(recipeInfo) {
    return axios.post(recipeURL, recipeInfo, { headers });
}

function updateRecipe(recipeId, updates) {
    return axios.patch(`${recipeURL}/${recipeId}`, updates, { headers });
}

function deleteRecipe(recipeId) {
    return axios.delete(`${recipeURL}/${recipeId}`, { headers });
}

export default {
    createRecipe, updateRecipe, deleteRecipe
}