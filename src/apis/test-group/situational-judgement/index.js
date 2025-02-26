import axios from "@/config/axiosConfig";
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";

export const getSpecificGroupData = async ({ token, logout, groupId }) => {
    try {
        const response = await axios.get(
            `/admin/situational-judgement/questions-list/${groupId}`,
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
            console.error("Error in get Specific Group Data", error);
            throw error;
        }
    }
};
//add
export const addQuestion = async ({ token, logout, questionData }) => {
    try {
        const response = await axios.post(
            `/admin/situational-judgement/add-question`,
            questionData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
        return response;
    } catch (error) {
        if (error.response?.status === 401) {
            unauthorizedErrorResponse(logout);
            return;
        } else {
            console.error("Error in add Question", error);
            throw error;
        }
    }
};

//Get question by Id
export const getQuestionById = async ({ token, logout, questionId }) => {
    try {
        const response = await axios.get(
            `/admin/situational-judgement/edit-question/${questionId}`,
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
            console.error("Error in get Question By Id", error);
            throw error;
        }
    }
};

//edit Question by id
export const editQuestion = async ({ token, logout, questionId, questionData }) => {
    try {
        const response = await axios.patch(
            `/admin/situational-judgement/edit-question/${questionId}`,
            questionData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
        return response;
    } catch (error) {
        if (error.response?.status === 401) {
            unauthorizedErrorResponse(logout);
            return;
        } else {
            console.error("Error in edit Question", error);
            throw error;
        }
    }
};

//delete question by id 
export const deleteQuestion = async ({ token, logout, questionId }) => {
    try {
        const response = await axios.delete(
            `/admin/situational-judgement/delete-question/${questionId}`,
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
            console.error("Error in delete Question", error);
            throw error;
        }
    }
};