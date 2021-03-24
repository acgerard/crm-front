import {http} from "./axios-config";
import Cookies from 'js-cookie';

export async function signIn(email, password, history) {
    try{
        const response = await http.post('/rpc/login', {email, pass: password});
        let token = response.data[0].token;
        Cookies.set('crm-token', token, {SameSite: "Strict"});
        http.defaults.headers.common.Authorization = `Bearer ${token}`;
        history.push("/crm/clients")
    } catch (e) {
        // TODO
    }

}