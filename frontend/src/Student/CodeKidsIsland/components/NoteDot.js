import React from "react";

function NoteDot({
  note,
  onClick
}) {

  if (!note) {
    return null;
  }

  return (

    <button
      type="button"
      className={
        `report-note-dot ${
          note.position || ""
        }`
      }
      onClick={(event) => {

        event.stopPropagation();

        onClick(note);

      }}
      aria-label={note.title}
    >

      📝

    </button>

  );

}

export default NoteDot;