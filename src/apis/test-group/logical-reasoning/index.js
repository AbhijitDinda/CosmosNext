import axios from "@/config/axiosConfig";
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";


//Add Question in Logical Reasoning
export const addQuestionInLogicalReasoning = async ({
    token,
    logout,
    formData,
}) => {
    try {
        const response = await axios.post(
            `/admin/logical-reasoning/questions/add`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response;
    } catch (error) {
        if (error.response?.status === 401) {
            unauthorizedErrorResponse(logout);
            return;
        } else {
            console.error("Error in add Question In Logical Reasoning", error);
        }
    }
};

// Edit Question in Logical Reasoning
export const editQuestionInLogicalReasoning = async ({
    token,
    logout,
    questionId,
    formData,
}) => {
    try {
        const response = await axios.post(
            `/admin/logical-reasoning/questions/update/${questionId}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response;
    } catch (error) {
        if (error.response?.status === 401) {
            unauthorizedErrorResponse(logout);
            return;
        } else {
            console.error("Error in edit Question In Logical Reasoning", error);
        }
    }
};

// Delete Question in Logical Reasoning
export const deleteQuestionInLogicalReasoning = async ({
    token,
    logout,
    questionId,
  }) => {
    try {
      const response = await axios.delete(
        `/admin/logical-reasoning/questions/delete/${questionId}`,
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
        console.error("Error in delete Question In Logical Reasoning", error);
      }
    }
};

// Get Question by ID in Logical Reasoning
export const getQuestionByIdInLogicalReasoning = async ({
    token,
    logout,
    questionId,
  }) => {
    try {
      const response = await axios.get(
        `/admin/logical-reasoning/questions/edit/${questionId}`,
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
        console.error("Error in get Question by ID In Logical Reasoning", error);
      }
    }
};
  