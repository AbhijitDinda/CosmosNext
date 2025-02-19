import axios from "@/config/axiosConfig";
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";

//add
export const addStyleInApproach = async ({ token, logout, post_data }) => {
  try {
    const response = await axios.post(
      `/admin/approach-assessment/approach-styles/add`,
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
      console.error("Error in add style In Approach", error);
      throw error;
    }
  }
};

export const addQuestionInApproach = async ({ token, logout, post_data }) => {
  try {
    const response = await axios.post(
      `/admin/approach-assessment/questions/add`,
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
      console.error("Error in add question In Approach", error);
      throw error;
    }
  }
};

//edit
export const editStyleInApproach = async ({ token, logout, post_data, id }) => {
  try {
    const response = await axios.patch(
      `/admin/approach-assessment/approach-styles/update/${id}`,
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
      console.error("Error in edit style In Approach", error);
      throw error;
    }
  }
};

export const editQuestionInApproach = async ({
  token,
  logout,
  post_data,
  id,
}) => {
  try {
    const response = await axios.patch(
      `/admin/approach-assessment/questions/update/${id}`,
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
      console.error("Error in edit question In Approach", error);
      throw error;
    }
  }
};

//delete
export const deleteStyleInApproach = async ({ token, logout, id }) => {
  try {
    const response = await axios.delete(
      `/admin/approach-assessment/approach-styles/delete/${id}`,
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
      console.error("Error in delete style In Approach", error);
      throw error;
    }
  }
};

export const deleteQuestionInApproach = async ({ token, logout, id }) => {
  try {
    const response = await axios.delete(
      `/admin/approach-assessment/questions/delete/${id}`,
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
      console.error("Error in delete question In Approach", error);
      throw error;
    }
  }
};

//get style by id
export const getStyleById = async ({ token, logout, id }) => {
  try {
    const response = await axios.get(
      `/admin/approach-assessment/approach-styles/${id}`,
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
      console.error("Error in get style by id", error);
      throw error;
    }
  }
};

//get Question by id
export const getQuestionById = async ({ token, logout, id }) => {
  try {
    const response = await axios.get(
      `/admin/approach-assessment/questions/${id}`,
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
      console.error("Error in get question by id", error);
      throw error;
    }
  }
};
//get list of style
export const getListOfStyles = async ({ token, logout }) => {
  try {
    const response = await axios.get(
      `/admin/approach-assessment/approach-styles`,
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
      console.error("Error in get list of styles", error);
      throw error;
    }
  }
};
