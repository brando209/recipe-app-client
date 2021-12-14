export function setLocalAuthToken(token) {
    localStorage.setItem("recipe_app_0246_auth_token", token);
}

export function getLocalAuthToken() {
    return localStorage.getItem("recipe_app_0246_auth_token");
}

export function removeLocalAuthToken() {
    localStorage.removeItem("recipe_app_0246_auth_token");
}