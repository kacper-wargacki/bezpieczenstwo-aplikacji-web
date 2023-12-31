import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { registerQuery } from "../helpers";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Find user login info
    const response = await registerQuery({ username, password });
    if (response.status === 200) {
      alert("Account created");
      router.push("/");
    } else if (response.status === 409) {
      alert(response.data.message);
    } else {
      alert("An error occurred, please try again");
    }
    setUsername("");
    setPassword("");
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
    router.push("/");
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input onChange={handleUsername} type="text" name="uname" required />
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
          <button onClick={handleRouter}>Back</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign Up</div>
        {renderForm}
      </div>
    </div>
  );
}
