import axios from "axios";
import { jwtDecode } from 'jwt-decode';
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
    .then(response => {
      // Check if the response is successful
      if (response && response.data) {
        return response.data; // Return the data if successful
      } else {
        throw new Error('Empty response'); // Throw an error if the response is empty
      }
    })
    .catch(error => {
      // Check if it's a network error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with error:', error.response.data);
        throw new Error('Server responded with error');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        throw new Error('No response received');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        throw error;
      }
    });
};


// Function to fetch a specific futsal by name
export const getFutsalByName = (futsalName: string) => {
  // Update token in headers in case it has changed
  updateTokenInHeaders();

  // Make a GET request to fetch the futsal by name
  return futsalAxios.get(`futsals/getByName/${futsalName}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching futsal by name:', error);
      throw error; // Rethrow the error for handling in the calling code
    });
};

// Function to fetch Futsal slots by Futsal ID
export const getFutsalSlotsByFutsalId = async (futsalId: number) => {
  updateTokenInHeaders();
  try {
    console.log(futsalId)
    const response = await futsalAxios.get(`futsal-slots/futsals/${futsalId}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching futsal slots by futsal ID:', error);
    throw error; // Rethrow the error for handling in the calling code
  }
};


// Function to fetch Futsal slots by Futsal ID
export const getFutsalSlotsByFutsalIdPending = async (futsalId: number) => {
  updateTokenInHeaders();
  try {
    console.log(futsalId)
    const response = await futsalAxios.get(`futsal-slots/futsals/${futsalId}/pending-slots`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching futsal slots by futsal ID:', error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

// Function to update futsal details by ID
export const updateFutsalByOwnerId = async (updatedFutsalDetails: any) => {
  try {
    // Retrieve the token from local storage
    const token = getTokenFromLocalStorage();

    // Check if the token exists
    if (!token) {
      throw new Error('Token not found in local storage');
    }
    
    // Decode the JWT to extract user information
    const decodedToken = jwtDecode(token);
    
    // Extract user ID from the decoded token
    const userId = decodedToken.sub;

    // Update headers with the JWT
    futsalAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Make a PUT request to the backend API endpoint to update futsals by owner ID
    const response = await futsalAxios.put(`futsals/updateByOwnerId/${userId}`, updatedFutsalDetails);

    // Return the updated futsal details from the response data
    return response.data;
  } catch (error) {
    // Handle any errors
    throw error;
  }
};


  export const createFutsal = (futsalData: any) => {
    // Update token in headers in case it has changed
    updateTokenInHeaders();
  
    // Make a POST request to create a new futsal
    return futsalAxios.post(`/futsals/save`, futsalData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error creating futsal:', error);
        throw error; // Rethrow the error for handling in the calling code
      });
  };
  


  export const getFutsalByOwnerId = async () => {
    try {
      // Retrieve the token from local storage
      const token = getTokenFromLocalStorage();
  
      // Check if the token exists
      if (!token) {
        throw new Error('Token not found in local storage');
      }
      
      // Decode the JWT to extract user information
      const decodedToken = jwtDecode(token);
      
      // Extract user ID from the decoded token
      const userId = decodedToken.sub;
  
      console.log(userId);
  
      // Update headers with the JWT
      futsalAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      // Make a GET request to the backend API endpoint to fetch futsals by owner ID
      const response = await futsalAxios.get(`futsals/getByOwnerEmail/${userId}`);
  
      // Return the futsals fetched by owner ID from the response data
      return response.data;
    } catch (error) {
      // Handle any errors
      throw error;
    }
  };
  

  export const requestBooking = async (bookingData: any) => {
    // Retrieve the token from local storage
    const token = getTokenFromLocalStorage();

    // Check if the token exists
    if (!token) {
        throw new Error('Token not found in local storage');
    }

    // Decode the JWT to extract user information
    const decodedToken = jwtDecode(token);

    // Extract user ID from the decoded token
    const username = decodedToken.sub;

    // Add the username to the bookingData object
    bookingData.username = username;

    // Update token in headers
    updateTokenInHeaders();

    try {
        const response = await futsalAxios.post("/bookings/request", bookingData);
        return response.data; // Return the response data if the request is successful
    } catch (error) {
        console.error("Error requesting booking:", error);
        throw error; // Rethrow the error for handling in the calling code
    }
};

export const getAllBookingRequests = async (futsalId: number) => {
  updateTokenInHeaders();
  try {
    console.log("the futsal id is:" + futsalId);
    const response = await futsalAxios.get(`/bookings/pending/${futsalId}`);
    console.log(response.data);
    return response.data; // Assuming the response contains a 'bookings' array
  } catch (error) {
    console.error('Error fetching booking requests:', error);
    throw error;
  }
};


  

export const updateBookingStatus = async (bookingId: number, action: string) => {
  updateTokenInHeaders();
  try {
    let response;
    if (action === 'reject') {
      response = await deleteBookingById(bookingId);
    } else {
      response = await futsalAxios.put(`/bookings/${action}/${bookingId}`);
    }
    return response.data;
  } catch (error) {
    console.error(`Error ${action === 'accept' ? 'accepting' : 'rejecting'} booking:`, error);
    throw error;
  }
};

export const deleteBookingById = async (bookingId: number) => {
  updateTokenInHeaders();
  try {
    const response = await futsalAxios.delete(`/bookings/deleteById/${bookingId}`);
    return response;
  } catch (error) {
    console.error('Error deleting booking by ID:', error);
    throw error;
  }
};


export const createSlot = async (slotData:any) => {
  console.log(slotData)
  updateTokenInHeaders();
  try {
    const response = await futsalAxios.post('/futsal-slots/save', slotData);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error creating slot:', error);
    throw error;
  }
};
