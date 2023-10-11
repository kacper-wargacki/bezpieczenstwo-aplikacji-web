import axios from "axios";

export const loginQuery = async (data) => {
  const query = `SELECT * FROM users WHERE username = '${data.username}' AND password = '${data.password}'`;
  const response = await axios.post("/api/login", { query });
  const userExists = response.data.result.rows.length > 0;
  return userExists;
};

export const allUsersQuery = async () => {
  const response = await axios.get("/api/allUsers");
  return response.data.result;
};

export const registerQuery = async (data) => {
  const userExists = await findUserQuery({ username: data.username });
  if (userExists.length > 0) {
    return 500;
  } else {
    const response = await axios.post("/api/register", data);
    return response.status === 200;
  }
};

export const findUserQuery = async (data) => {
  const query = `SELECT * FROM users WHERE username = '${data.username}'`;
  const response = await axios.post("/api/findUser", { query });
  console.log(response);
  return response.data.result.rows;
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
