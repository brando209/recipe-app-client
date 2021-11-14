import useAsync from "./useAsync";
import axios from "axios";

const DEFAULT_OPTIONS = {
    headers: { "Content-Type": "application/json" },
}

export default function useResource(path, options = {}, dependencies = []) {
    return useAsync(() => {
        return axios.get(path, { ...DEFAULT_OPTIONS, ...options }).then(res => {
            console.log(res);
            if(res.status === 200) return res.data;
        })
    }, dependencies);
}