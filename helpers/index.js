import axios from "axios";

const db = "http://127.0.0.1:3000";
const headers = {
  "Content-Type": "application/json",
};
export const loginQuery = async (data) => {
  const response = await axios.post(`${db}/login`, { data }).catch((error) => {
    return error.response;
  });
  return response;
};

export const registerQuery = async (data) => {
  const response = await axios.post(`${db}/register`, data).catch((error) => {
    return error.response;
  });
  return response;
};

export const createNoteQuery = async (data) => {
  const response = await axios
    .post(`${db}/createNote`, {
      id: data.id,
      note: data.note,
      token: data.token,
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const getNotesQuery = async (data) => {
  const response = await axios
    .post(`${db}/getNotes`, { id: data.id, token: data.token })
    .catch((error) => {
      return error.response;
    });
  return response;
};

export const deleteAllNotesQuery = async (data) => {
  const response = await axios
    .post(`${db}/deleteAllNotes`, {
      token: data.token,
      userType: data.userType,
    })
    .catch((error) => {
      return error.response;
    });
  return response;
};
