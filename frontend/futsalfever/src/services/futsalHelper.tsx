import axios from "axios";
import { jwtDecode } from 'jwt-decode';
export const BASE_URL = 'http://localhost:8082';


const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

const futsalAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getTokenFromLocalStorage()}`
  }
});

export const updateTokenInHeaders = () => {
  futsalAxios.defaults.headers.common['Authorization'] = `Bearer ${getTokenFromLocalStorage()}`;
};

export const getAllFutsals = () => {
  updateTokenInHeaders();

  return futsalAxios.get('/futsals/getAll')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching futsals:', error);
      throw error;
    });
};

export const getFutsalById = (futsalId: number) => {
  updateTokenInHeaders();

  return futsalAxios.get(`futsals/getById/${futsalId}`)
    .then(response => {
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('Empty response');
      }
    })
    .catch(error => {
      if (error.response) {
        console.error('Server responded with error:', error.response.data);
        throw new Error('Server responded with error');
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('No response received');
      } else {
        console.error('Error setting up request:', error.message);
        throw error;
      }
    });
};


export const getFutsalByName = (futsalName: string) => {
  updateTokenInHeaders();

  return futsalAxios.get(`futsals/getByName/${futsalName}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching futsal by name:', error);
      throw error;
    });
};

export const getFutsalSlotsByFutsalId = async (futsalId: number) => {
  updateTokenInHeaders();
  try {
    console.log(futsalId)
    const response = await futsalAxios.get(`futsal-slots/futsals/${futsalId}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching futsal slots by futsal ID:', error);
    throw error;
  }
};


export const getFutsalSlotsByFutsalIdPending = async (futsalId: number) => {
  updateTokenInHeaders();
  try {
    console.log(futsalId)
    const response = await futsalAxios.get(`futsal-slots/futsals/${futsalId}/pending-slots`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching futsal slots by futsal ID:', error);
    throw error;
  }
};

export const updateFutsalByOwnerId = async (updatedFutsalDetails: any) => {
  try {
    const token = getTokenFromLocalStorage();

    if (!token) {
      throw new Error('Token not found in local storage');
    }
    
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub;

    futsalAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    console.log("the user is:")
    console.log(userId)

    const response = await futsalAxios.put(`futsals/updateByOwnerId/${userId}`, updatedFutsalDetails, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};



export const createFutsal = (futsalData: any) => {
  updateTokenInHeaders();
  const formData = new FormData();

  formData.append('name', futsalData.name);
  formData.append('address', futsalData.address);
  formData.append('qr', futsalData.qr);
  formData.append('price', futsalData.price);

  formData.append('file', futsalData.file);

  return futsalAxios.post(`/futsals/save`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  })
  .then(response => response.data)
  .catch(error => {
      console.error('Error creating futsal:', error);
      throw error;
  });
};

  


  export const getFutsalByOwnerId = async () => {
    try {
      const token = getTokenFromLocalStorage();
  
      if (!token) {
        throw new Error('Token not found in local storage');
      }
      
      const decodedToken = jwtDecode(token);
      
      const userId = decodedToken.sub;
  
      console.log(userId);
  
      futsalAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      const response = await futsalAxios.get(`futsals/getByOwnerEmail/${userId}`);
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  

  export const getUserIdFromToken= async () => {
    const token = getTokenFromLocalStorage();
  
    if (!token) {
      throw new Error('Token not found in local storage');
    }
    
    const decodedToken = jwtDecode(token);

    const userId = decodedToken.sub;

    return userId;
    
  }

  export const requestBooking = async (bookingData: any) => {
    const token = getTokenFromLocalStorage();

    if (!token) {
        throw new Error('Token not found in local storage');
    }

    const decodedToken = jwtDecode(token);

    const username = decodedToken.sub;

    bookingData.username = username;

    updateTokenInHeaders();

    const formData = new FormData();

    // Append booking data to formData
    Object.entries(bookingData).forEach(([key, value]: [string, any]) => { // Specify the types explicitly
        formData.append(key, value);
    });

    try {
        const response = await futsalAxios.post("/bookings/request", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error requesting booking:", error);
        throw error;
    }
};


export const getAllBookingRequests = async (futsalId: number) => {
  updateTokenInHeaders();
  try {
    console.log("the futsal id is:" + futsalId);
    const response = await futsalAxios.get(`/bookings/pending/${futsalId}`);
    console.log(response.data);
    return response.data;
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
