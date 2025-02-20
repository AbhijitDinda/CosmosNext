import axios from "@/config/axiosConfig";
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";

//add
export const addQuestionInEmotionalIntelligence = async ({ token, logout, post_data }) => {
  try {
    const response = await axios.post(
      `/admin/emotional-intelligence/questions/add`,
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
      console.error("Error in add Question In Emotional Intelligence", error);
      throw error;
    }
  }
};

export const addApproachStyleInEmotionalIntelligence = async ({ token, logout, post_data }) => {
    try {
        console.log("Token :", token);
        console.log("Post Data :", post_data);

        const response = await axios.post(
            `/admin/emotional-intelligence/groups/add`,
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
            console.error("Error in add Approach Style In Emotional Intelligence", error);
            throw error;
        }
    }
};

//edit
export const editQuestionInEmotionalIntelligence = async ({ token, logout, post_data, questionId }) => {
    try {
        const response = await axios.patch(
            `/admin/emotional-intelligence/questions/update/${questionId}`,
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
            console.error("Error in edit Question In Emotional Intelligence", error);
            throw error;
        }
    }
};

export const editApproachStyleInEmotionalIntelligence = async ({ token, logout, post_data, groupId }) => {
    try {
        const response = await axios.patch(
            `/admin/emotional-intelligence/groups/update/${groupId}`,
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
            console.error("Error in edit Approach Style In Emotional Intelligence", error);
            throw error;
        }
    }
};

//delete
export const deleteQuestionInEmotionalIntelligence = async ({ token, logout, questionId }) => {
    try {
        const response = await axios.delete(
            `/admin/emotional-intelligence/questions/delete/${questionId}`,
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
            console.error("Error in delete Question In Emotional Intelligence", error);
            throw error;
        }
    }
};

export const deleteApproachStyleInEmotionalIntelligence = async ({ token, logout, groupId }) => {
    try {
        const response = await axios.delete(
            `/admin/emotional-intelligence/groups/delete/${groupId}`,
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
            console.error("Error in delete Approach Style In Emotional Intelligence", error);
            throw error;
        }
    }
};

//get question by id
export const getQuestionByIdInEmotionalIntelligence = async ({ token, logout, questionId }) => {
    try {
        const response = await axios.get(
            `/admin/emotional-intelligence/questions/${questionId}`,
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
            console.error("Error in get Question By Id In Emotional Intelligence", error);
            throw error;
        }
    }
};

//get Approach Style by id

export const getApproachStyleByIdInEmotionalIntelligence = async ({ token, logout, groupId }) => {
    try {
        const response = await axios.get(
            `/admin/emotional-intelligence/groups/${groupId}`,
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
            console.error("Error in get Approach Style By Id In Emotional Intelligence", error);
            throw error;
        }
    }
};

//get all ApproachStyle 

export const getAllApproachStylesInEmotionalIntelligence = async ({ token, logout }) => {
    try {
        const response = await axios.get(
            `/admin/emotional-intelligence/groups`,
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
            console.error("Error in get All Approach Styles In Emotional Intelligence", error);
            throw error;
        }
    }
};
