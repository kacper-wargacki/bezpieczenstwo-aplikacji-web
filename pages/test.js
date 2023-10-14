import {
  createNoteQuery,
  loginQuery,
  registerQuery,
  verifyToken,
} from "../helpers";
import { useCookies } from "react-cookie";

export default function Test() {
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const handleLoginQuery = async () => {
    const response = await loginQuery({ username: "admin", password: "admin" });
    if (response.status === 200) {
      const user = response.data.user;
      if (user.id) {
        setCookie("token", response.data.token, { path: "/" });
      } else {
        alert("Login failed");
      }
    } else {
      alert(response.data.message);
    }
    console.log(response);
  };
  const handleRegisterQuery = async () => {
    const result = await registerQuery({
      username: "user5",
      password: "user5",
    });
    console.log(result);
  };
  const handleVerifyToken = async () => {
    const result = await verifyToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwidXNlcm5hbWUiOiJhZG1pbiIsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE2OTcyOTcwODEsImV4cCI6MTY5NzI5NzA4MX0.wV7NxBGHnTLwy5s2_yy2bhCVPlHELyH8ZdIBD3an3Eo"
    );
    console.log(result);
  };
  const handleCreateNote = async () => {
    const result = await createNoteQuery({
      id: 991,
      note: "123",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwidXNlcm5hbWUiOiJhZG1pbiIsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE2OTcyOTcwODEsImV4cCI6MTY5NzI5NzA4MX0.wV7NxBGHnTLwy5s2_yy2bhCVPlHELyH8ZdIBD3an3Eo",
    });
    console.log(result);
  };
  return (
    <>
      <button onClick={handleLoginQuery}>login</button>
      <button onClick={handleRegisterQuery}>register</button>
      <button onClick={handleVerifyToken}>token</button>
      <button onClick={handleCreateNote}>createnote</button>
    </>
  );
}
