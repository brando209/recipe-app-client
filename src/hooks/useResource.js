import useAsync from "./useAsync";
import axios from "axios";

const DEFAULT_OPTIONS = {
    headers: { "Content-Type": "application/json" },
}

export default function useResource(path, options = {}, isProtected = false, dependencies = []) {
    return useAsync(() => {
        if(!path) return Promise.reject(null);
        const token = options.headers?.authorization?.split(" ")[1];
        if(isProtected && (token === null || token === "null" || token === undefined || token === "undefined")) {
            return Promise.reject("No valid auth token");
        }
        return axios.get(path, { ...DEFAULT_OPTIONS, ...options }).then(res => {
            if(res.status === 200) return res.data;
        })
    }, dependencies);
}