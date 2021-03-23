import axios from "axios";
import Cookies from 'js-cookie';

export const http = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Prefer': 'return=representation',
        'Authorization': `Bearer ${Cookies.get("token")}`
    }
});