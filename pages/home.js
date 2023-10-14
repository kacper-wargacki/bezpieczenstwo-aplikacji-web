import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  createNoteQuery,
  deleteAllNotesQuery,
  getNotesQuery,
} from "../helpers";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["username"]);
  const [hydrated, setHydrated] = useState(false);
  const [notes, setNotes] = useState([]);
  const [reload, setReload] = useState(false);
  const [user, setUser] = useState();
  const router = useRouter();

  const fetchNotes = async (data) => {
    const result = await getNotesQuery({
      id: data.userId,
      token: cookies.token,
    });
    if (result.status === 200) {
      setNotes(result.data.result.rows);
    } else if (result.status === 400) {
      alert(result.data.message);
      removeCookie("token", { path: "/" });
      router.replace("/");
    } else {
      alert(result.message);
      removeCookie("token", { path: "/" });
      router.replace("/");
    }
  };

  useEffect(() => {
    if (
      !cookies.token ||
      jwt.decode(cookies.token).exp < Math.floor(Date.now() / 1000)
    ) {
      router.replace("/");
      removeCookie("token", { path: "/" });
      return;
    }
  }, [router]);

  useEffect(() => {
    setHydrated(true);
    if (!cookies.token) {
      router.replace("/");
      return;
    }
    const decoded = jwt.decode(cookies.token);
    setUser(decoded);
    // wait for router to initialize before running the query
    if (!router.isReady) {
      return;
    }
    cookies.token && fetchNotes(decoded);
  }, [router.isReady]);

  useEffect(() => {
    if (reload === true) {
      fetchNotes(user);
      setReload(false);
    }
  }, [reload]);

  const handleLogout = (event) => {
    event.preventDefault();
    removeCookie("token", { path: "/" });
    router.replace("/");
  };

  const handleCreate = async () => {
    const note = prompt("Enter your note: ");
    const result = await createNoteQuery({
      id: user.userId,
      note,
      token: cookies.token,
    });
    console.log(result);
    if (result.status === 200) {
      setReload(true);
    } else if (result.status === 400) {
      alert(result.data.message);
      removeCookie("token", { path: "/" });
      router.replace("/");
    } else {
      console.log(result);
      alert(result.message);
    }
  };

  const handleDelete = async () => {
    const result = await deleteAllNotesQuery({
      userType: user.userType,
      token: cookies.token,
    });
    if (result.status === 200) {
      setReload(true);
    } else if (result.status === 400) {
      alert(result.data.message);
      removeCookie("token", { path: "/" });
      router.replace("/");
    } else {
      alert(result.message);
    }
  };

  return (
    <>
      <div>
        <h1>
          Hello, <a>{hydrated && cookies.token && user.username}</a>
        </h1>
      </div>
      <div>
        <h2>Here are your notes:</h2>
        {notes.map((note) => (
          <div key={note.id + randomBytes(20)}>{note.note}</div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="button-container">
        <button onClick={handleCreate}>Create a note</button>
      </div>
      {hydrated && cookies.token && user.userType === "admin" && (
        <>
          <div className="button-container-text">Only for admins!</div>
          <div className="button-container">
            <button onClick={handleDelete}>Delete all notes</button>
          </div>
        </>
      )}
    </>
  );
}
