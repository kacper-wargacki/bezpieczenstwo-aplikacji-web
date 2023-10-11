import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { findUserQuery, loginQuery } from "../helpers";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    if (cookies.userId) {
      router.push(`/home?userId=${cookies.userId}`);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Find user login info
    const response = await loginQuery({ username, password });
    console.log(response, "is user in database");
    if (response) {
      console.log(username);
      setCookie("username", username, { path: "/" });
      const users = await findUserQuery({ username });
      console.log(users);
      setCookie("userId", users[0].id, { path: "/" });
      setCookie("userType", users[0].userType, { path: "/" });
      router.push(`/home?userId=${users[0].id}`);
    } else {
      alert("Login failed");
    }
  };

  //handle username and password input to state
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  //handle router to register page
  const handleRouter = (event) => {
    event.preventDefault();
    router.push("/register");
  };

  // JSX code for login form
  const renderForm = (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Username </label>
              <input
                onChange={handleUsername}
                type="text"
                name="uname"
                required
              />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input
                onChange={handlePassword}
                type="password"
                name="pass"
                required
              />
            </div>
            <div className="button-container">
              <input type="submit" />
            </div>
            <div className="button-container">
              <button onClick={handleRouter}>Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return <>{renderForm}</>;
}
