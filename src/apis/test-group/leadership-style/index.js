import axios from "@/config/axiosConfig";
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";

//add
export const addQuestionInLeadershipStyle = async ({
  token,
  logout,
  post_data,
}) => {
  try {
    const response = await axios.post(
      `/admin/leadership-style/questions/add`,
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
      console.error("Error in add Question In Leadership Style", error);
      throw error;
    }
  }
};

export const addStyleInLeadershipStyle = async ({
  token,
  logout,
  post_data,
}) => {
  try {
    const response = await axios.post(
      `/admin/leadership-style/styles/add`,
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
      console.error("Error in add Style In Leadership Style", error);
      throw error;
    }
  }
};

//edit

export const updateQuestionInLeadershipStyle = async ({
  token,
  logout,
  post_data,
  questionId,
}) => {
  try {
    const response = await axios.patch(
      `/admin/leadership-style/questions/update/${questionId}`,
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
      console.error("Error in update Question In Leadership Style", error);
      throw error;
    }
  }
};

export const updateStyleInLeadershipStyle = async ({
  token,
  logout,
  post_data,
  styleId,
}) => {
  try {
    const response = await axios.patch(
      `/admin/leadership-style/styles/update/${styleId}`,
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
      console.error("Error in update Style In Leadership Style", error);
      throw error;
    }
  }
};

//delete
export const deleteStyleInLeadershipStyle = async ({
  token,
  logout,
  styleId,
}) => {
  try {
    const response = await axios.delete(
      `/admin/leadership-style/styles/delete/${styleId}`,
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
      console.error("Error in delete Style In Leadership Style", error);
      throw error;
    }
  }
};

export const deleteQuestionInLeadershipStyle = async ({
  token,
  logout,
  questionId,
}) => {
  try {
    const response = await axios.delete(
      `/admin/leadership-style/questions/delete/${questionId}`,
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
      console.error("Error in delete Question In Leadership Style", error);
      throw error;
    }
  }
};

//get question by id
export const getQuestionById = async ({ token, logout, questionId }) => {
  try {
    const response = await axios.get(
      `/admin/leadership-style/questions/${questionId}`,
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

//get style by id

export const getStyleById = async ({ token, logout, styleId }) => {
  try {
    const response = await axios.get(
      `/admin/leadership-style/styles/${styleId}`,
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
      console.error("Error in get Style By Id", error);
      throw error;
    }
  }
};

//get all style
export const getAllStyles = async ({ token, logout }) => {
  try {
    const response = await axios.get(`/admin/leadership-style/questions/add`, {
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
      console.error("Error in get All Styles", error);
      throw error;
    }
  }
};
