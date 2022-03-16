export function authHeader(token) {
    return { authorization: `BEARER ${token}` }
}