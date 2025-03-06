import { Axios } from "./axios";
import axios from "axios";

// export const userInterface = axios.get("https://jsonplaceholder.org/users");
export const getUser = async () => {
    const response = await axios.get("https://jsonplaceholder.org/users");
    return response;
}

export const postUser = async () => {
    const response = await axios.get("https://jsonplaceholder.org/posts")
    return response;
}