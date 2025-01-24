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
            console.error("Error in Fatch Test group details", error);
            throw error;
        }
    }
}

export const updateTestsById = async ({ token, logout, test_id, data }) => {
    try {
        const response = await axios.post(`/admin/test/settings/update/${test_id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json', // Ensure the request has the correct content type
            },
        });
        return response.data; // Return only the response data for simplicity
    } catch (error) {
        if (error.response?.status === 401) {
            unauthorizedErrorResponse(logout);
            return;
        } else {
            console.error("Error in updating Test Group details", error);
            throw error; // Rethrow the error to be caught in the `useMutation` onError
        }
    }
};
