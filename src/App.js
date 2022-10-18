import React  from "react";
// import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
// import { data } from "./data";
import Split from "react-split";
import { nanoid } from "nanoid";

export const App = () => {
  //retrieve The Data From Local Storage
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );

  //Setting The Note ID
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || "" //It means that we checked if notes exist before checking the id Now it wont throw an error trying to acces empty note id
  );

  //Saving The Data To Local Storage
  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  //Create The New Note
  function createNewNote() {
    // console.log("Halala")
    const newNote = {
      id: nanoid(),
      body: "# Title",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  //Update the Note Editor passes the body text to functions
  function updateNote(text) {
    // Try to rearrange the most recently-modified
    // not to be at the top
    setNotes((oldNotes) => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, body: text });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });

    // setNotes((oldNotes) =>
    //   oldNotes.map((oldNote) => {
    //     return oldNote.id === currentNoteId
    //       ? { ...oldNote, body: text }
    //       : oldNote;
    //   })
    // );
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  function handleDelete() {
    let newArray = [];
    newArray = notes.filter((note) => {
      return note.id !== currentNoteId;
    });
    setNotes(newArray);
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            handleDelete={handleDelete}
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1 id="Notez-title">Notez</h1>
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
};

export default App;
