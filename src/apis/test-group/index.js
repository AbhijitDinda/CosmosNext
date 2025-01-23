import axios from '@/config/axiosConfig';
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";
export const getTestGroup = async ({ token }, logout, search, page) => {
    try {
        const response = await axios.get(`/admin/test/lists?search=${search}&page=${page}`, {
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


export const fatchTestGroupById = async ({ token, logout, test_id }) => {
    try {
        const response = await axios.get(`/admin/test/settings/${test_id}`, {
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
}
