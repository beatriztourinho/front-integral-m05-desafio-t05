import axios from 'axios'

export const instance = axios.create({
    baseURL: `https://charges-be.herokuapp.com/`,
})