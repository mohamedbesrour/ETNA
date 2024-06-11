import React, { useState } from "react";

const InputTodo: React.FC = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch(`${process.env.REACT_APP_SERVERURL}/commentaire/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location.reload();
    } catch (err: any) { // Typé en `any`
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-center mt-5">Input Todo</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </div>
  );
};

export default InputTodo;
