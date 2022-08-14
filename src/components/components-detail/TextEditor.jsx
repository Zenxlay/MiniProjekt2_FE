import React from "react";
import Jodit from "jodit-react";

const TextEditor = ({ setText, value }) => {
  return (
    <>
      <div className="text-editor">
        <Jodit value={value} onChange={setText} />
      </div>
    </>
  );
};

export default TextEditor;
