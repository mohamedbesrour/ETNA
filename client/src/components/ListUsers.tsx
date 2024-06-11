import React, { Fragment, useEffect, useState } from "react";
import EditUser from "./EditUser";

// Définir le type pour les données des utilisateurs
interface Utilisateur {
  user_id: string;
  role: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
}

const ListUsers = () => {
  // État local pour stocker les données des utilisateurs
  const [users, setUsers] = useState<Utilisateur[]>([]);

  // Fonction pour supprimer un utilisateur
  const deleteUser = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/connexion/connexion/${id}`, {
        method: "DELETE",
      });
      // Filtrer la liste des utilisateurs pour retirer celui qui a été supprimé
      setUsers(users.filter((connexion) => connexion.user_id !== id));
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  // Fonction pour récupérer la liste des utilisateurs depuis le serveur
  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/connexion/connexion");
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

  // Utiliser useEffect pour appeler getUsers une fois que le composant est monté
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>Rôle</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Mot de passe</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((connexion) => (
            <tr key={connexion.user_id}>
              <td>{connexion.role}</td>
              <td>{connexion.nom}</td>
              <td>{connexion.prenom}</td>
              <td>{connexion.email}</td>
              <td>{connexion.password}</td>
              <td>
                <EditUser connexion={connexion} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(connexion.user_id)}
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