import axios from 'axios';

function createMealPlanItem(itemInfo, headers) {
    return axios.post("/api/planner/meal", itemInfo, { headers });
}

function updateMealPlanItem(itemId, updates, headers) {
    return axios.patch(`/api/planner/meal/${itemId}`, updates, { headers });
}

function deleteMealPlanItem(itemId, headers) {
    return axios.delete(`/api/planner/meal/${itemId}`, { headers })
} 

function createGroceryItem(itemInfo, headers) {
    return axios.post("/api/planner/grocery", itemInfo, { headers });
}

function updateGroceryItem(itemId, updates, headers) {
    return axios.patch(`/api/planner/grocery/${itemId}`, updates, { headers });
}

function deleteGroceryItem(itemId, headers) {
    return axios.delete(`/api/planner/grocery/${itemId}`, { headers })
} 

const plannerApi = {
    createMealPlanItem, updateMealPlanItem, deleteMealPlanItem,
    createGroceryItem, updateGroceryItem, deleteGroceryItem
}

export default plannerApi;