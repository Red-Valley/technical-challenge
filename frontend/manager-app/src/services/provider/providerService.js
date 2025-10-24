import axios from 'axios';
import { BASE_URL } from '../../../config/envs';

export const createProvider = async ({ queryKey }) => {
  const [_, params] = queryKey;
  try {
    const response = await axios.post(`${BASE_URL}/providers`, params);
    return  response.data;
  } catch (error) {
    throw error;
  }
};