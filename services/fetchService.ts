import axios from 'axios';
import { ApexCandlesSeries } from '~/types/chartTypes';

const BASE_URL = '';

export const fetchData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        const data = response.data;

        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
};