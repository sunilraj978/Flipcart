import axios from 'axios'


const token = window.localStorage.getItem('token');


const axiosInstance = axios.create({
    baseURL:'http://localhost:2000/',
    headers:{
        "Authorization": token? `bearar ${token}` : console.log("Error occured")
    }
})


export default axiosInstance;