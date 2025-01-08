import axios from '@/config/axiosConfig';

export const signInRequest = async ({ user_id, password }) => {
    try {
        const response = await axios.post('/admin/login', {
            user_id,
            password
        });
        return response.data;
    } catch(error) {
        console.error(error);
        throw error.response.data;     
    }
};