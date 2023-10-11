import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  createNoteQuery,
  deleteAllNotesQuery,
  getNotesQuery,
} from "../helpers";
import jwt from "jsonwebtoken"
import { randomBytes } from "crypto";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["username"]);
  const [hydrated, setHydrated] = useState(false);
  const [notes, setNotes] = useState([]);
  const [reload, setReload] = useState(false);
  const [user, setUser] = useState()
  const router = useRouter();

  const fetchNotes = async (data) => {
    const result = await getNotesQuery({ id: data.userId });
    setNotes(result);
  };

  useEffect(() => {
    setHydrated(true);
    if (!cookies.token) {
      router.push("/");
    }
    const decoded = jwt.decode(cookies.token)
    setUser(decoded)
    console.log(decoded)
    // wait for router to initialize before running the query
    if (!router.isReady) {
      return;
    }
    fetchNotes(decoded);
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
    router.push("/");
  };

  const handleCreate = async () => {
    const note = prompt("Enter your note: ");
    console.log(user.userId, note)
    const result = await createNoteQuery({ id: user.userId, note });
    if (result) {
      setReload(true);
    }
  };

  const handleDelete = async () => {
    const result = await deleteAllNotesQuery({ id: user.userId });
    console.log(result);
    if (result) {
      setReload(true);
    }
  };

  return (
    <>
      <div>
        <h1>
          Hello, <a>{hydrated && user.username}</a>
        </h1>
      </div>
      <div>
        <h2>Here are your notes:</h2>
        {notes.map((note) => (
          <div key={note.id+randomBytes(20)}>{note.note}</div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="button-container">
        <button onClick={handleCreate}>Create a note</button>
      </div>
      {hydrated && user.userType === "admin" && (
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
