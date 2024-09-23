import React, { Fragment, useEffect, useState } from "react";
import EditUser from "./EditUser";

interface Utilisateur {
  email: string;
  password: string;
}

const ListUsers: React.FC = () => {
  const [users, setUsers] = useState<Utilisateur[]>([]);

  const deleteUser = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });
      // Filtre les utilisateurs pour retirer celui supprimé
      setUsers(users.filter((user) => user.email !== id));
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const jsonData: Utilisateur[] = await response.json();
      setUsers(jsonData);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Mot de passe</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <EditUser user={user} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(user.email)}
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

export default ListUsers;
