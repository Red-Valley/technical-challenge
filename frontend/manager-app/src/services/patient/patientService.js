import axios from 'axios';
import { BASE_URL } from '../../../config/envs';

export const createPatient = async (values) => {
  try {
    const response = await axios.post(`${BASE_URL}/patients`, values);
    return  response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPatients = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/patients`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
