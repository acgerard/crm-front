import { http } from './axios-config'

export async function signIn(email: string, password: string) {
  try {
    await http.post('/users/authenticate', { email, password })
    http.defaults.headers.Authorization = `Basic ${window.btoa(`${email}:${password}`)}`
  } catch (e) {
    // TODO logout
  }
}
