import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  createNoteQuery,
  deleteAllNotesQuery,
  getNotesQuery,
} from "../helpers";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["username"]);
  const [hydrated, setHydrated] = useState(false);
  const [notes, setNotes] = useState([]);
  const [reload, setReload] = useState(false);

  const router = useRouter();

  const fetchNotes = async () => {
    const result = await getNotesQuery({ id: router.query.userId });
    setNotes(result);
  };

  useEffect(() => {
    setHydrated(true);
    if (!cookies.username) {
      router.push("/");
    }

    // wait for router to initialize before running the query
    if (!router.isReady) {
      return;
    }
    fetchNotes();
  }, [router.isReady]);

  useEffect(() => {
    if (reload === true) {
      fetchNotes();
      setReload(false);
    }
  }, [reload]);

  const handleLogout = (event) => {
    event.preventDefault();
    removeCookie("username", { path: "/" });
    removeCookie("userId", { path: "/" });
    removeCookie("userType", { path: "/" });
    router.push("/");
  };

  const handleCreate = async () => {
    const note = prompt("Enter your note: ");
    const result = await createNoteQuery({ id: router.query.userId, note });
    if (result) {
      setReload(true);
    }
  };

  const handleDelete = async () => {
    const result = await deleteAllNotesQuery({ id: router.query.userId });
    console.log(result);
    if (result) {
      setReload(true);
    }
  };

  return (
    <>
      <div>
        <h1>
          Hello, <a>{hydrated && cookies.username}</a>
        </h1>
      </div>
      <div>
        <h2>Here are your notes:</h2>
        {notes.map((note) => (
          <div key={note.id}>{note.note}</div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="button-container">
        <button onClick={handleCreate}>Create a note</button>
      </div>
      {hydrated && cookies.userType === "admin" && (
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
