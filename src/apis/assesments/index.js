import axios from '@/config/axiosConfig';
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";
export const getListOfAssesments = async ({ token },logout,page,search) => {
    try {
        console.log("page-search",page,search)
        const response = await axios.get(`/admin/list-of-assessments?search=${search}&page=${page}`, {
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
            console.error("Error in Get list of Assesments details", error);
            throw error;
        }

    }
};