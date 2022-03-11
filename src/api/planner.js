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


export default {
    createMealPlanItem, updateMealPlanItem, deleteMealPlanItem
}