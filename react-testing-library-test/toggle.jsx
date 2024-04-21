import React, { useState } from "react";

export default function Toggle({ onChange }) {
  const [state, setState] = useState(false);

  return (
    <button
      onClick={() => {
        setState(previousState => !previousState);
        onChange(!state);
      }}
    >
      {state === true ? "Turn off" : "Turn on"}
    </button>
  );
}
