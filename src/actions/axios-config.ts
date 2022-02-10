import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://pnaz7941.odns.fr/crm',
  timeout: 3000,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
    Prefer: 'return=representation',
  },
})
