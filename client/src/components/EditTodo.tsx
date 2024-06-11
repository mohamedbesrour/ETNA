import React, { useState } from "react";

interface Props {
  commentaire: {
    commentaire_id: string;
    description: string;
  };
}

const EditTodo: React.FC<Props> = ({ commentaire }) => {
  const [description, setDescription] = useState(commentaire.description);

  const updateDescription = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch(`${process.env.REACT_APP_SERVERURL}/commentaire/todos/${commentaire.commentaire_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location.reload();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <h2>Edit Todo</h2>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          value={description}
          onChange={(e) => updateDescription(e)}
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default EditTodo;
