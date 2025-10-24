import axios from 'axios';
import { BASE_URL } from '../../../config/envs';

export const getAllStatuses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/statuses`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
