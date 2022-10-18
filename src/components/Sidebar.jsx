import React from "react";

export const Sidebar = (props) => {
  // function toggle(){
  document.getElementsByClassName("help--screen");
  // }

  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
        <i
          className="fa-solid fa-trash delete-btn"
          onClick={props.handleDelete}
        ></i>
        {/* Changed using the split method */}
      </div>
    </div>
  ));

  function handleToggle() {
    const list = document.getElementById("helpScreen").classList;
    list.toggle("toggle");
  }

  return (
    <section className="pane sidebar">
      <div id="helpScreen" className="help--screen">
        <h1>How to use this text editor</h1>
        <button className="new-note closeHelper" onClick={handleToggle}>
          X
        </button>
        <p>
          Copy the Code Below into the Text Editor And Click Preview from above
          pane <br /># Title <br />
          ### Title 2 <br />
          **BOLD** <br />
          *Italic* <br />
          ~~Line Through~~
          <br />
          [""https://fahadabbas920.github.io/portfolio](URL) <br />
          &lt; Style 1
          <br />
          ``Style 2`` <br />
          ![](https://i.natgeofe.com/k/f576c284-661a-4046-ba51-
          fa95699e1a8b/hawaii-beach.png) <br />- List Style 1 <br />
          1. Ordered List <br />- [ ] List Style 2
        </p>
        {/* <img src="/src/assets/projectTenzieGame.jpg" alt="" /> */}
      </div>
      <div className="sidebar--header">
        <h2>Notez</h2>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
        <button className="new-note help" onClick={handleToggle}>
          Help
        </button>
      </div>
      {noteElements}
    </section>
  );
};

export default Sidebar;
