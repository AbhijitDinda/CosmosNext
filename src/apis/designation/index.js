import axios from '@/config/axiosConfig';
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";


// export const getListOfDesignation = async ({ token,logout}) => {
//     try {
//         const response = await axios.get('/admin/list-of-designation?page=1', {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Accept': 'application/json'
//             }
//         });

//         return response;
//     } catch (error) {
//         if (error.response?.status === 401) {
//             unauthorizedErrorResponse(logout);
//             return;
//         } else {
//             console.error("Error in Get list of Designation details", error);
//             throw error;
//         }

//     }
// };

export const getListOfDesignation = async ({ token, logout }) => {
    try {
        let allData = [];
        let currentPage = 1; // Start from page 1
        let lastPage = 1; // Default to 1; this will update after the first API call.

        // Fetch the first page to get initial data and metadata
        const initialResponse = await axios.get(`/admin/list-of-designation?page=${currentPage}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        // Add the data from the first page
        allData = [...initialResponse.data.data.data]; // Adjust to your API structure
        lastPage = initialResponse.data.data.last_page; // Get the total number of pages

        // Fetch remaining pages if there are more
        const pagePromises = [];
        for (currentPage = 2; currentPage <= lastPage; currentPage++) {
            pagePromises.push(
                axios.get(`/admin/list-of-designation?page=${currentPage}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                })
            );
        }

        // Resolve all remaining page requests
        const responses = await Promise.all(pagePromises);

        // Add the data from all subsequent pages
        responses.forEach(response => {
            allData = [...allData, ...response.data.data.data];
        });
        // console.log("allData",allData)

        return allData; // Return the aggregated data
    } catch (error) {
        if (error.response?.status === 401) {
            unauthorizedErrorResponse(logout);
            return;
        } else {
            console.error("Error fetching all designations", error);
            throw error;
        }
    }
};