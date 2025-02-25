import axios from '@/config/axiosConfig';
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";

// add module
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

export const addSubQuestionInTeamInventory = async ({ token , logout, post_data}) => {
    try {
        console.log("inside post_data",post_data,logout)
        const response = await axios.post(`/admin/team-inventory/sub-questions/add`,post_data , {
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

export const addTraitsInTeamInventory = async ({ token , logout, post_data}) => {
    try {
        console.log("inside post_data",post_data,logout)
        const response = await axios.post(`/admin/team-inventory/traits/add`,post_data , {
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

//edit module

export const editQuestionInTeamInventory = async ({ token , logout, post_data, q_id}) => {
    try {
        console.log("inside post_data",post_data,logout)
        const response = await axios.patch(`/admin/team-inventory/questions/update/${q_id}`,post_data , {
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
            console.error("Error in Edit Question", error);
            throw error;
        }
    }
}

export const editSubQuestionInTeamInventory = async ({ token , logout, post_data, SubQ_id}) => {
    try {
        console.log("inside post_data",post_data,logout)
        const response = await axios.patch(`/admin/team-inventory/sub-questions/update/${SubQ_id}`,post_data , {
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
            console.error("Error in Edit sub Question", error);
            throw error;
        }
    }
}

export const editTraitInTeamInventory = async ({ token , logout, post_data, traits_id}) => {
    try {
        console.log("inside post_data",post_data,logout)
        const response = await axios.patch(`/admin/team-inventory/traits/update/${traits_id}`,post_data , {
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
            console.error("Error in Edit Traits", error);
            throw error;
        }
    }
}

//delete

export const deleteQuestionInTeamInventory = async ({ token, logout, q_id }) => {
    try {
        const response = await axios.delete(`/admin/team-inventory/questions/delete/${q_id}`, {
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
            console.error("Error in Delete Question", error);
            throw error;
        }
    }
}

export const deleteSubQuestionInTeamInventory = async ({ token, logout, SubQ_id }) => {
    try {
        const response = await axios.delete(`/admin/team-inventory/sub-questions/delete/${SubQ_id}`, {
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
            console.error("Error in Delete Question", error);
            throw error;
        }
    }
}

export const deleteTraitInTeamInventory = async ({ token, logout, traits_id }) => {
    try {
        const response = await axios.delete(`/admin/team-inventory/traits/delete/${traits_id}`, {
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
            console.error("Error in Delete Question", error);
            throw error;
        }
    }
}

//get question by ID
export const getQuestionById = async ({ token, logout, q_id }) => {
    try {
        const response = await axios.get(`/admin/team-inventory/questions/${q_id}`, {
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
            console.error("Error in Get Question by ID", error);
            throw error;
        }
    }
}

//get traits by ID
export const getTraitById = async ({ token, logout, traits_id }) => {
    try {
        const response = await axios.get(`/admin/team-inventory/traits/${traits_id}`, {
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
            console.error("Error in Get Trait by ID", error);
            throw error;
        }
    }
}

//get all Question
export const getAllQuestions = async ({ token, logout }) => {
    try {
        const response = await axios.get(`/admin/team-inventory/questions`, {
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
            console.error("Error in Get All Questions", error);
            throw error;
        }
    }
}

//get All Traits
export const getAllTraits = async ({ token, logout }) => {
    try {
        const response = await axios.get(`/admin/team-inventory/traits`, {
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
            console.error("Error in Get All Traits", error);
            throw error;
        }
    }
}