import axios from "axios";
import jwt from "jsonwebtoken";

export const loginQuery = async (data) => {
  const response = await axios.post("/api/login", { data }).catch((error) => {
    return error.response;
  });
  return response;
};

export const registerQuery = async (data) => {
  const response = await axios.post("/api/register", data).catch((error) => {
    return error.response;
  });
  return response;
};

export const createNoteQuery = async (data) => {
  const response = await axios
    .post("/api/createNote", {
      id: data.id,
      note: data.note,
      token: data.token,
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
  return response;
};

export const getNotesQuery = async (data) => {
  const response = await axios
    .post("/api/getNotes", { id: data.id, token: data.token })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
  return response;
};

export const deleteAllNotesQuery = async (data) => {
  const response = await axios
    .post("/api/deleteAllNotes", { token: data.token, userType: data.userType })
    .catch((error) => {
      return error.response;
    });
  return response;
};

// backend side helper function
export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    if (!decoded.username) {
      return { message: "Token verification error", status: 404 };
    } else {
      return { message: "Token OK", status: 200, decoded };
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return { message: "Token expired, please login again", status: 400 };
    } else {
      return { message: error, status: 500 };
    }
  }
};
