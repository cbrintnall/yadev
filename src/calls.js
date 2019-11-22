import axios from 'axios';
import Settings from './settings';

const instance = axios.create({
    baseURL: Settings.backendUrl
})

export const sendCodeToBackend = (code) => {
    instance.get("/auth/github", {
        code: code
    })
    .then(res => {
        console.log("Result: ")
        console.log(res)
    })
    .catch(err => {
        console.log(err.error)
    })
};