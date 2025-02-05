import axios from '@/config/axiosConfig';
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";

export const getTestReport = async ({ token,logout,test_token,candidate_id}) => {
    try {
        const response = await axios.get(`/admin/candidate/result/${test_token}/${candidate_id}`, {
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
            console.error("Error in Get Test Report", error);
            throw error;
        }

    }
};
