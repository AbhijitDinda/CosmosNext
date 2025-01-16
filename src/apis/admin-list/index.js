import axios from '@/config/axiosConfig';
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";


export const getAllAdmin = async ({ token }, logout, page) => {
    try {
        const response = await axios.get(`/admin/admin-list?page=${page}`, {
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
            console.error("Error in Get list of Admins", error);
            throw error;
        }
    }
};

export const addAdmin = async ({ organization_name, name, user_id, account_status, token ,logout}) => {
    try {
        const response = await axios.post(
            '/admin/add-admin',
            { organization_name, name, user_id, account_status },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            }
        );

        return response;
    } catch (error) {
        if (error.response?.status === 401) {
            console.error("Unauthorized access. Please log in again.");
            unauthorizedErrorResponse(logout);
            return;
        } else {
            // console.error("Error in adding admin:", error);
            throw error;
        }
    }
};



export const deleteAdmin = async ({ token,logout,admin_id }) => {
    try {
        const response = await axios.delete(`/admin/admin-delete/${admin_id}`, {
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
            console.error("Error in Delete Admin", error);
            throw error;
        }

    }
};
