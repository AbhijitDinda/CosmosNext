import axios from '@/config/axiosConfig';

export const getDashboardDetails = async ({token}) => {
    try {
        const response = await axios.get('/admin/dashboard',{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        
        return response;
    } catch(error) {
        console.error(error);
        throw error;     
    }
};