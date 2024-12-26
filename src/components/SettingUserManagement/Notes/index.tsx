import React from "react";

interface Note {
  id: string;
  title: string;
  text: string;
}

interface NotesProps {
  notes: Note[];
}

export const Notes: React.FC<NotesProps> = ({ notes }) => {
  return (
    <div className="w-full text-left">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Notes</h3>
        <button className="text-14 text-gray-500 underline decoration-solid hover:text-gray-700 hover:underline">
          Add
        </button>
      </div>

      {notes.length > 0 ? (
        <ul className="text-sm text-gray-700">
          {notes.map((note) => (
            <li key={note.id} className="mb-1">
              <strong>{note.title}: </strong>
              {note.text}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No notes available</p>
      )}
    </div>
  );
};
