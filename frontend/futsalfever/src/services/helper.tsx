import axios from "axios";
export const BASE_URL= 'http://localhost:8082';

export const myAxios = axios.create({
    baseURL: BASE_URL,
});

export const getAllFutsals = () => {

    return myAxios.get('/futsals/getAll')
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching futsals:', error);
        throw error;
      });
  };

