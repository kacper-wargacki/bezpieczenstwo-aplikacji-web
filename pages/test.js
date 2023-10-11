import {
  allUsersQuery,
  findUserQuery,
  loginQuery,
  registerQuery,
  verifyToken,
} from "../helpers";
import { useCookies } from "react-cookie";

export default function Test() {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const handleAllUsersQuery = async () => {
    const result = await allUsersQuery();
    console.log(result);
  };
  const handleFindUserQuery = async () => {
    const result = await findUserQuery({ username: "admin" });
    console.log(result);
  };
  const handleLoginQuery = async () => {
    const result = await loginQuery({ username: "admin", password: "admin" });
    console.log(result);
  };
  const handleRegisterQuery = async () => {
    const result = await registerQuery({
      username: "admin",
      password: "admin",
    });
    console.log(result);
  };
  const handleVerifyToken = async () => {
    const result = await verifyToken(cookies.token)
    console.log(result)
  }
  return (
    <>
      <button onClick={handleAllUsersQuery}>allusers</button>
      <button onClick={handleFindUserQuery}>finduser</button>
      <button onClick={handleLoginQuery}>login</button>
      <button onClick={handleRegisterQuery}>register</button>
      <button onClick={handleVerifyToken}>token</button>
    </>
  );
}
