import React, { Fragment, useEffect, useState } from "react";
import EditUser from "./EditUser";

interface Utilisateur {
  // user_id: string;
  // role: string;
  // nom: string;
  // prenom: string;
  email: string;
  password: string;
}

const ListUsers = () => {
  const [users, setUsers] = useState<Utilisateur[]>([]);

  const deleteUser = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/users/users/${id}`, {
        method: "DELETE",
      });
      // Filtre les utilisateurs pour retirer celuisupprimé
      setUsers(users.filter((users) => users.email !== id));
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
      const response = await fetch("http://localhost:5000/users/users");
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
            {/* <th>Rôle</th>
            <th>Nom</th>
            <th>Prénom</th> */}
            <th>Email</th>
            <th>Mot de passe</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((users) => (
            <tr key={users.email}>
              {/* <td>{connexion.role}</td>
              <td>{connexion.nom}</td>
              <td>{connexion.prenom}</td> */}
              <td>{users.email}</td>
              <td>{users.password}</td>
              <td>
                <EditUser users={users} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(users.email)}
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