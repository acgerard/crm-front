import {http} from "./axios-config";
import Cookies from 'js-cookie';

export async function signIn(email, password, history) {
    try{
        const response = await http.post('/rpc/login', {email, pass: password});
        let token = response.data[0].token;
        Cookies.set('token', token, {SameSite: "Strict"});
        console.log("http BEFORE", http)
        http.defaults.headers.common.Authorization = `Bearer ${token}`;
        console.log("http AFTER", http)
        history.push("/crm/clients")
    } catch (e) {
        // TODO
    }

}