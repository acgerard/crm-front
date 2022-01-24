import {http} from "./axios-config";

export async function signIn(email, password, history) {
    try{
        await http.post('/users/authenticate', {email, password});
        http.defaults.headers.Authorization = `Basic ${window.btoa(`${email}:${password}`)}`;
        history.push("/crm/clients")
    } catch (e) {
        // TODO logout
    }

}