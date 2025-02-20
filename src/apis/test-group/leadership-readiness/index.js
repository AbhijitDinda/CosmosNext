import axios from "@/config/axiosConfig";
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";

//add

export const addQuestionInLeadershipReadiness = async ({
  token,
  logout,
  post_data,
}) => {
  try {
    const response = await axios.post(
      `/admin/leadership-readiness/questions/add`,
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
      console.error("Error in add Question In Leadership Readiness", error);
      throw error;
    }
  }
};

export const addStyleInLeadershipReadiness = async ({
  token,
  logout,
  post_data,
}) => {
  try {
    const response = await axios.post(
      `/admin/leadership-readiness/leadership-styles/add`,
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
      console.error(
        "Error in add Leadership Style In Leadership Readiness",
        error
      );
      throw error;
    }
  }
};

//edit
export const editQuestionInLeadershipReadiness = async ({
  token,
  logout,
  post_data,
  questionId,
}) => {
  try {
    const response = await axios.patch(
      `/admin/leadership-readiness/questions/update/${questionId}`,
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
      console.error("Error in edit Question In Leadership Readiness", error);
      throw error;
    }
  }
};

export const editStyleInLeadershipReadiness = async ({
  token,
  logout,
  post_data,
  styleId,
}) => {
  try {
    const response = await axios.patch(
      `/admin/leadership-readiness/leadership-styles/update/${styleId}`,
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
      console.error("Error in edit Style In Leadership Readiness", error);
      throw error;
    }
  }
};

//delete

export const deleteQuestionInLeadershipReadiness = async ({
  token,
  logout,
  questionId,
}) => {
  try {
    const response = await axios.delete(
      `/admin/leadership-readiness/questions/delete/${questionId}`,
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
      console.error("Error in delete Question In Leadership Readiness", error);
      throw error;
    }
  }
};

export const deleteStyleInLeadershipReadiness = async ({
  token,
  logout,
  styleId,
}) => {
  try {
    const response = await axios.delete(
      `/admin/leadership-readiness/leadership-styles/delete/${styleId}`,
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
      console.error("Error in delete Style In Leadership Readiness", error);
      throw error;
    }
  }
};

//get question by id
export const getQuestionByIdInLeadershipReadiness = async ({
  token,
  logout,
  questionId,
}) => {
  try {
    const response = await axios.get(
      `/admin/leadership-readiness/questions/${questionId}`,
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
        "Error in get Question By Id In Leadership Readiness",
        error
      );
      throw error;
    }
  }
};

//get style by id
export const getStyleByIdInLeadershipReadiness = async ({
  token,
  logout,
  styleId,
}) => {
  try {
    const response = await axios.get(
      `/admin/leadership-readiness/leadership-styles/${styleId}`,
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
      console.error("Error in get Style By Id In Leadership Readiness", error);
      throw error;
    }
  }
};

//get all
export const getAllStylesInLeadershipReadiness = async ({ token, logout }) => {
  try {
    const response = await axios.get(
      `/admin/leadership-readiness/leadership-styles/`,
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
      console.error("Error in get All Styles In Leadership Readiness", error);
      throw error;
    }
  }
};
