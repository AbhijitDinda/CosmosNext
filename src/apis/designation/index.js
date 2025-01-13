import axios from '@/config/axiosConfig';
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";
export const getListOfDesignation = async ({ token },logout) => {
    try {
        const response = await axios.get('/admin/list-of-designation', {
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
            console.error("Error in Get list of Designation details", error);
            throw error;
        }

    }
};