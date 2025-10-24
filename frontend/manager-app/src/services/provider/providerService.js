import axios from 'axios';
import { BASE_URL } from '../../../config/envs';

export const createProvider = async (values) => {
  try {
    const response = await axios.post(`${BASE_URL}/providers`, values);
    return  response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProviders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/providers`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
