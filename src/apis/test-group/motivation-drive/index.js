import axios from "@/config/axiosConfig";
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";

// add
export const addMotivationGroupInMotivationDrive = async ({
  token,
  logout,
  post_data,
}) => {
  try {
    const response = await axios.post(
      `/admin/motivation-drive/motivation-groups/add`,
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
      console.error("Error in add Motivation Group In MotivationDrive", error);
      throw error;
    }
  }
};

export const addQuestionInMotivationDrive = async ({
  token,
  logout,
  post_data,
}) => {
  try {
    const response = await axios.post(
      `/admin/motivation-drive/questions/add`,
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
      console.error("Error in add Question In MotivationDrive", error);
      throw error;
    }
  }
};

//edit

export const editMotivationGroupInMotivationDrive = async ({
  token,
  logout,
  post_data,
  groupId,
}) => {
  try {
    const response = await axios.patch(
      `/admin/motivation-drive/motivation-groups/update/${groupId}`,
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
      console.error("Error in edit Motivation Group In MotivationDrive", error);
      throw error;
    }
  }
};

export const editQuestionInMotivationDrive = async ({
  token,
  logout,
  post_data,
  questionId,
}) => {
  try {
    const response = await axios.patch(
      `/admin/motivation-drive/questions/update/${questionId}`,
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
      console.error("Error in edit Question In MotivationDrive", error);
      throw error;
    }
  }
};

//delete

export const deleteMotivationGroupInMotivationDrive = async ({
  token,
  logout,
  groupId,
}) => {
  try {
    const response = await axios.delete(
      `/admin/motivation-drive/motivation-groups/delete/${groupId}`,
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
      console.error(
        "Error in delete Motivation Group In MotivationDrive",
        error
      );
      throw error;
    }
  }
};

export const deleteQuestionInMotivationDrive = async ({
  token,
  logout,
  questionId,
}) => {
  try {
    const response = await axios.delete(
      `/admin/motivation-drive/questions/delete/${questionId}`,
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
      console.error("Error in delete Question In MotivationDrive", error);
      throw error;
    }
  }
};

//get Motivation Group by id
export const getMotivationGroupById = async ({ token, logout, groupId }) => {
  try {
    const response = await axios.get(
      `/admin/motivation-drive/motivation-groups/${groupId}`,
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
      console.error("Error in get Motivation Group By Id", error);
      throw error;
    }
  }
};

//get Question by id

export const getQuestionById = async ({ token, logout, questionId }) => {
  try {
    const response = await axios.get(
      `/admin/motivation-drive/questions/${questionId}`,
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

//get all motivation Group data

export const getAllMotivationGroups = async ({ token, logout }) => {
  try {
    const response = await axios.get(`/admin/motivation-drive/questions/add`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    if (error.response?.status === 401) {
      unauthorizedErrorResponse(logout);
      return;
    } else {
      console.error("Error in get All Motivation Groups", error);
      throw error;
    }
  }
};
