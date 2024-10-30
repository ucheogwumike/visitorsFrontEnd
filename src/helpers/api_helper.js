import axios from "axios"
// import accessToken from "./jwt-token-access/accessToken"
import { GET_VISITORS } from "./url_helper"

//pass new generated access token here
const token =  JSON.parse(localStorage.getItem("authUser"));//localStorage.getItem("access_token",JSON.stringify(response.access_token))


//apply base url for axios
const API_URL = process.env.REACT_APP_API_URL 

const API_URL2 = process.env.REACT_APP_API_URL2

const axiosApi = axios.create({
  baseURL: API_URL,
})

const axiosApi2 = axios.create({
  baseURL: API_URL2,
})
console.log(API_URL,1)
axiosApi2.defaults.headers.common = {'Authorization':`Bearer ${token?.access_token}`}

// axiosApi2.interceptors.response.use(
//   response => response,
//   error => Promise.reject(error)
// )

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function findVisitors(url, config = {}) {
 
  const response =  await axiosApi2.get(url, { ...config })//.then(response => response.data)
  return response.data;
}

export async function editVisitors(url, config = {}) {
 
  const response =  await axiosApi2.patch(url, { ...config })//.then(response => response.data)
  return response.data;
}

export async function CreateVisitor(url, config = {}) {
 
  const response =  await axiosApi2.post(url, { ...config })//.then(response => response.data)
  return response.data;
}

export async function getProfile(url, config = {}) {
 
  const response =  await axiosApi.get(url, { ...config })//.then(response => response.data)
  return response.data;
}

export async function post(url, data, config = {}) {
  return axiosApi2
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
