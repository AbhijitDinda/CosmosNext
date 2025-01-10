import axios from '@/config/axiosConfig';
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";
export const getDashboardDetails = async ({ token },logout) => {
    try {
        const response = await axios.get('/admin/dashboard', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        return response;
    } catch (error) {
        if (error.response?.status === 401) {
            unauthorizedErrorResponse(logout);
            return;
        } else {
            console.error("meeeeee", error);
            throw error;
        }

    }
};