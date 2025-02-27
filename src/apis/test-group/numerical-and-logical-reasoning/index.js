import axios from "@/config/axiosConfig";
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";


//add
export const addSectionInNumericalReasoning = async ({
  token,
  logout,
  formData,
}) => {
  try {
    const response = await axios.post(
      `/admin/numerical-reasoning/sections/add`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response?.status === 401) {
      unauthorizedErrorResponse(logout);
      return;
    } else {
      console.error("Error in add Section In Numerical Reasoning", error);
      // throw error;
    }
  }
};
export const addQuestionInNumericalReasoning = async ({
  token,
  logout,
  formData,
}) => {
  try {
    const response = await axios.post(
      `/admin/numerical-reasoning/questions/add`,
      formData,
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
      console.error("Error in add Question In Numerical Reasoning", error);
      // throw error;
    }
  }
};

//edit
export const updateSectionInNumericalReasoning = async ({
  token,
  logout,
  formData,
  sectionId,
}) => {
  try {
    const response = await axios.post(
      `/admin/numerical-reasoning/sections/update/${sectionId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response?.status === 401) {
      unauthorizedErrorResponse(logout);
      return;
    } else {
      console.error("Error in update Section In Numerical Reasoning", error);
      // throw error;
    }
  }
};
export const updateQuestionInNumericalReasoning = async ({
  token,
  logout,
  formData,
  questionId,
}) => {
  try {
    const response = await axios.patch(
      `/admin/numerical-reasoning/questions/update/${questionId}`,
      formData,
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
      console.error("Error in update Question In Numerical Reasoning", error);
      // throw error;
    }
  }
};

//delete
export const deleteSectionInNumericalReasoning = async ({
  token,
  logout,
  sectionId,
}) => {
  try {
    const response = await axios.delete(
      `/admin/numerical-reasoning/sections/delete/${sectionId}`,
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
      console.error("Error in delete Section In Numerical Reasoning", error);
      // throw error;
    }
  }
};
export const deleteQuestionInSituationalJudgement = async ({
  token,
  logout,
  questionId,
}) => {
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
      console.error("Error in delete Question In Situational Judgement", error);
      // throw error;
    }
  }
};

//get question by id
export const getQuestionByIdInNumericalReasoning = async ({
  token,
  logout,
  questionId,
}) => {
  try {
    const response = await axios.get(
      `/admin/numerical-reasoning/questions/edit/${questionId}`,
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
      console.error("Error in get Question By Id In Numerical Reasoning", error);
      // throw error;
    }
  }
};

//get section by id
export const getSectionByIdInNumericalReasoning = async ({
  token,
  logout,
  sectionId,
}) => {
  try {
    const response = await axios.get(
      `/admin/numerical-reasoning/sections/edit/${sectionId}`,
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
      console.error("Error in get Section By Id In Numerical Reasoning", error);
      // throw error;
    }
  }
};



