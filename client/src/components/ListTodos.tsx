import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

interface Todo {
  commentaire_id: string;
  description: string;
}

const ListTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`${process.env.REACT_APP_SERVERURL}/commentaire/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((commentaire) => commentaire.commentaire_id !== id));
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/commentaire/todos`);
      const jsonData: Todo[] = await response.json();
      setTodos(jsonData);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>Commentaire</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((commentaire) => (
            <tr key={commentaire.commentaire_id}>
              <td>{commentaire.description}</td>
              <td>
                <EditTodo commentaire={commentaire} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(commentaire.commentaire_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
