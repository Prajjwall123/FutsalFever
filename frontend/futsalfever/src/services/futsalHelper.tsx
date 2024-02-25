import axios from "axios";

export const BASE_URL = 'http://localhost:8082';

// Function to fetch the token from local storage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

// Create an Axios instance with custom configuration including the token
const futsalAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json', // Assuming JSON API
    'Authorization': `Bearer ${getTokenFromLocalStorage()}` // Include the token in the Authorization header
  }
});

// Function to update token in Axios headers if it changes
export const updateTokenInHeaders = () => {
  futsalAxios.defaults.headers.common['Authorization'] = `Bearer ${getTokenFromLocalStorage()}`;
};

// Function to fetch all futsals
export const getAllFutsals = () => {
  // Update token in headers in case it has changed
  updateTokenInHeaders();

  // Make a GET request to fetch all futsals
  return futsalAxios.get('/futsals/getAll')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching futsals:', error);
      throw error; // Rethrow the error for handling in the calling code
    });
};

// Function to fetch a specific futsal by ID
export const getFutsalById = (futsalId: number) => {
    // Update token in headers in case it has changed
    updateTokenInHeaders();
  
    // Make a GET request to fetch the futsal by ID
    return futsalAxios.get(`futsals/getById/${futsalId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching futsal by ID:', error);
        throw error; // Rethrow the error for handling in the calling code
      });
  };

// Function to update futsal details by ID
export const updateFutsalById = (futsalId: number, updatedFutsalDetails: any) => {
    // Make a PUT request to the backend API endpoint
    return axios.put(`futsals/updateById/${futsalId}`, updatedFutsalDetails)
      .then(response => {
        // Return the updated futsal details from the response
        return response.data;
      })
      .catch(error => {
        // Handle any errors
        throw error;
      });
  };