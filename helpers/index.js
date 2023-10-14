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
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getNotesQuery = async (data) => {
  const response = await axios
    .post("/api/getNotes", { id: data.id })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const deleteAllNotesQuery = async () => {
  const response = await axios.post("/api/deleteAllNotes").catch((error) => {
    return error.response;
  });
  return response;
};

export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    console.log(decoded);
    if (!decoded) {
      return { message: "Token verification error", status: 404 };
    } else if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return { message: "Token expired, please login again", status: 400 };
    } else {
      return { message: "Token OK", status: 200 };
    }
  } catch (error) {
    console.log(error);
    return { message: "Server error", status: 500 };
  }
};
