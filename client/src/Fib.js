import React, { useState } from "react";

const Fib = () => {
  const [state, setstate] = useState({
    seenIndexes: [],
    values: {},
    index: "",
  });
  async function fetchValues() {
    const values = await fetch("/api/values/current");
    const json = await values.json();
    setstate({ ...state, values: json });
  }
  async function fetchIndexes() {
    const seenIndexes = await fetch("/api/values/all");
    const json = await seenIndexes.json();
    setstate({ ...state, seenIndexes: json });
  }
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch("/api/values", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ index: state.index }),
          });
          setstate({ ...state, index: "" });
          fetchValues();
          fetchIndexes();
        }}
      >
        <label>Enter your index:</label>
        <input
          value={state.index}
          onChange={(e) => setstate({ ...state, index: e.target.value })}
        />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {state.seenIndexes.map(({ number }) => number).join(", ")}
      <h3>Calculated Values:</h3>
      {Object.keys(state.values).map((key) => (
        <div key={key}>
          For index {key} I calculated {state.values[key]}
        </div>
      ))}
    </div>
  );
};

export default Fib;
