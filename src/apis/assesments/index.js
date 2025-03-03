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
            // throw error;
        }

    }
};

export const getCreateAssesmentsFieldsData = async ({ token,logout}) => {
    try {
        const response = await axios.get(`/admin/create-test`, {
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
            console.error("Error in Get Create Assesments Fields Data details", error);
            // throw error;
        }

    }
};

export const CreateAssessment = async ({ token, logout,test_variant,dataObj }) => {
    try {
        const response = await axios.post(
            `/admin/create-test/${test_variant}`,
            dataObj,
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
            unauthorizedErrorResponse(logout);
            return;
        } else {
            console.error("Error in craete Assessment", error);
            // throw error;
        }
    }
};

export const getAssessmentsAllUser = async ({ token,logout,assessment_id}) => {
    try {

        const response = await axios.get(`/admin/list-of-assessment-users/${assessment_id}`, {
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
            console.error("Error in Assesments All User Data details", error);
            // throw error;
        }

    }
};

export const compareAssessmentUser = async ({ token, logout, assessment_id }) => {
    try {
        const response = await axios.get(`/admin/assessment-compare-results/${assessment_id}`, {
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
            console.error("Error in Compare Assessment User", error);
            // throw error;
        }
    }
};