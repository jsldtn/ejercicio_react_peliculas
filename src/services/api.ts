import axios from 'axios';
import Config from '../config';

// Create an Axios instance
const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 5000, // Set a timeout of 5 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a request intereptor
api.interceptors.request.use (
  
  (config) => {
    // Add any custom logic before the request is sent
    const newConfig = { ...config };

    newConfig.headers.Authorization = `Bearer ${
    
        import.meta.env.VITE_MOVIE_API_KEY
    
    }`; // Add the API key to the headers

    newConfig.headers.accept = 'application/json'; // Set the accept header to application/json
    
    return newConfig; // Return the modified config

},

  (error) => {
    // Handle request error
    console.error('Request error:', error); // Log the error to the console
    return Promise.reject(error);
    
  }

);

// Create a response interceptor
api.interceptors.response.use (
  (response) => response,

  (error) => {
    // Handle response error
    console.error('Response error:', error); // Log the error to the console
    return Promise.reject(error);
  }
);

export default api; // Export the Axios instance for use in other parts of the application
