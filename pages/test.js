import {
  allUsersQuery,
  findUserQuery,
  loginQuery,
  registerQuery,
} from "../helpers";

export default function test() {
  const handleAllUsersQuery = async () => {
    const result = await allUsersQuery();
    console.log(result);
  };
  const handleFindUserQuery = async () => {
    const result = await findUserQuery({ username: "admin" });
    console.log(result);
  };
  const handleLoginQuery = async () => {
    const result = await loginQuery({ username: "admin2", password: "admin2" });
    console.log(result);
  };
  const handleRegisterQuery = async () => {
    const result = await registerQuery({
      username: "admin",
      password: "admin",
    });
    console.log(result);
  };
  return (
    <>
      <button onClick={handleAllUsersQuery}>allusers</button>
      <button onClick={handleFindUserQuery}>finduser</button>
      <button onClick={handleLoginQuery}>login</button>
      <button onClick={handleRegisterQuery}>register</button>
    </>
  );
}
