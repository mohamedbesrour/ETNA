import React, { Fragment, useState, ChangeEvent, FormEvent } from "react";
import AuthEmployeSurPageAdmin from "../context/AuthEmployeSurPageAdmin";

const InputUser: React.FC = () => {
  const [formData, setFormData] = useState({
    // role: "",
    // nom: "",
    // prenom: "",
    email: "",
    password: "",
  });

  const { 
    // role, 
    // nom, 
    // prenom, 
    email, 
    password } = formData;

  // target des changement des données du champs formulaire
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const body = { 
        // role, 
        // nom, 
        // prenom, 
        email, 
        password };
      
      // Requête POST au serveur avec les données
      const response = await fetch("http://localhost:5000/users/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        window.location.href = "/admin";
      } else {
        console.error("Failed to submit form");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Ajouter un employé</h1>
      <form className="d-flex flex-column align-items-center mt-5" onSubmit={onSubmitForm}>
        {/* <input
          type="text"
          className="form-control mb-3"
          name="role"
          value={role}
          onChange={onChange}
          placeholder="Admin ou Users"
        />
        <input
          type="text"
          className="form-control mb-3"
          name="nom"
          value={nom}
          onChange={onChange}
          placeholder="Nom de l'employé"
        />
        <input
          type="text"
          className="form-control mb-3"
          name="prenom"
          value={prenom}
          onChange={onChange}
          placeholder="Prénom de l'employé"
        /> */}
        <input
          type="email"
          className="form-control mb-3"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
        />
        <input
          type="password"
          className="form-control mb-3"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Mot de passe"
        />
        <button className="btn btn-success">Enregistré</button>
      </form>

      <AuthEmployeSurPageAdmin />
    </Fragment>
  );
};

export default InputUser;
