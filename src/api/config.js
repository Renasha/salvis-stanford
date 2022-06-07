import axios from "axios";

// Create instance
let instance = axios.create({
    baseURL: 'http://django-env.eba-c9mqyysw.us-west-2.elasticbeanstalk.com/'
    });

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Token ${token}` : '';
    return config;
});
  
export default instance;