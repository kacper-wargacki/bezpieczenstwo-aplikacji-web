import axios from "axios";

export const loginQuery = async (data) => {
  console.log(data);
  const response = await axios.post("/api/login", { data });
  return response;
};

export const allUsersQuery = async () => {
  const response = await axios.get("/api/allUsers");
  return response.data.result;
};

export const registerQuery = async (data) => {
  const response = await axios.post("/api/register", data);
  return response.status === 200;
};

export const createNoteQuery = async (data) => {
  const response = await axios.post("/api/createNote", {
    id: data.id,
    note: data.note,
  });
  return response.status === 200;
};

export const getNotesQuery = async (data) => {
  const response = await axios.post("/api/getNotes", { id: data.id });
  return response.data.result.rows;
};

export const deleteAllNotesQuery = async (data) => {
  const response = await axios.post("/api/deleteAllNotes");
  return response.status === 200;
};

export const verifyToken = async (data) => {
  const response = await axios.post("/api/verifyToken", { token: data });
  return response.status === 200;
};
