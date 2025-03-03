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
            console.error("error in Get dashboard details", error);
            // throw error;
        }

    }
};


export const getDesignationChart = async (designation_name, {token} ,logout) => {
    try {
        console.log("post_data",designation_name)
        const response = await axios.post('/admin/designation-filter',{designation_name}, {
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
            console.error("error in Get Designation details", error);
            // throw error;
        }

    }
};