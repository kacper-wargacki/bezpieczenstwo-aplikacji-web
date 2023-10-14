import { loginQuery, registerQuery, verifyToken } from "../helpers";
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
    const result = await verifyToken(cookies.token);
    console.log(result);
  };
  return (
    <>
      <button onClick={handleLoginQuery}>login</button>
      <button onClick={handleRegisterQuery}>register</button>
      <button onClick={handleVerifyToken}>token</button>
    </>
  );
}
