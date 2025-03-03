import axios from '@/config/axiosConfig';
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";
export const getAllCandidates = async ({ token },logout, page = 1) => {
    try {
        const response = await axios.get(`/admin/candidates?page=${page}`, {
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
            console.error("Error in Get all Candidates", error);
            // throw error;
        }

    }
};

export const filterAllCandidates = async ({ token}, logout, search = "", designation = "", status = "",page = 1 ) => {
    try {
        const response = await axios.get(`/admin/candidates/filter?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
            params: {
                search,
                designation,
                status
            }
        });

        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            unauthorizedErrorResponse(logout);
        } else {
            console.error("Error in fetching candidates:", error);
        }
        // throw error;
    }
};