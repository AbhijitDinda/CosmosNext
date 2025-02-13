import axios from '@/config/axiosConfig';
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";

export const addQuestionInTeamInventory = async ({ token , logout, post_data}) => {
    try {
        console.log("inside post_data",post_data,logout)
        const response = await axios.post(`/admin/team-inventory/questions/add`,post_data , {
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
            console.error("Error in Fatch Assessment details", error);
            throw error;
        }
    }
}