import axios from "@/config/axiosConfig";
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";

// add module
export const addQuestionInVerbalReasoning = async ({
    token,
    logout,
    post_data,
}) => {
    try {
        const response = await axios.post(
            `/admin/verbal-reasoning/questions/add`,
            post_data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );
        return response;
    } catch (error) {
        if (error.response?.status === 401) {
            unauthorizedErrorResponse(logout);
            return;
        } else {
            console.error("Error in adding question to Verbal Reasoning", error);
            // throw error;
        }
    }
};

//get Question by id
export const getQuestionByIdInVerbalReasoning = async ({ token, logout, questionId }) => {
    try {
        const response = await axios.get(
            `/admin/verbal-reasoning/questions/edit/${questionId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            unauthorizedErrorResponse(logout);
            return;
        } else {
            console.error("Error in fetching question by ID from Verbal Reasoning", error);
            // throw error;
        }
    }
};

//update question by id
export const updateQuestionByIdInVerbalReasoning = async ({ token, logout, questionId, update_data }) => {
    try {
        const response = await axios.patch(
            `/admin/verbal-reasoning/questions/update/${questionId}`,
            update_data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            unauthorizedErrorResponse(logout);
            return;
        } else {
            console.error("Error in updating question by ID in Verbal Reasoning", error);
            // throw error;
        }
    }
};

//Delete Question By Id
export const deleteQuestionInVerbalReasoning = async ({ token, logout, questionId }) => {
    try {
        const response = await axios.delete(
            `/admin/verbal-reasoning/questions/delete/${questionId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            unauthorizedErrorResponse(logout);
            return;
        } else {
            console.error("Error in deleting question by ID in Verbal Reasoning", error);
            // throw error;
        }
    }
};