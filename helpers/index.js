import axios from "axios";

const db = process.env.NEXT_PUBLIC_DB_URL;

const headers = {
  "Content-Type": "application/json",
};
export const loginQuery = async (data) => {
  console.log(`Attempting to login with ${data}`);
  const response = await axios.post(`${db}/login`, { data }).catch((error) => {
    console.log(error);
    return error.response;
  });
  console.log(`Returning function response: ${response}`);
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
