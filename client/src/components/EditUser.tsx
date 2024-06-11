import React, { useState } from "react";

interface Connexion {
  user_id: string; // Ajouté number plus tard
  role: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
}

interface Props {
  connexion: Connexion;
}

const EditUser: React.FC<Props> = ({ connexion }) => {
  const [formData, setFormData] = useState<Connexion>({
    user_id: connexion.user_id, // Ajouté
    role: connexion.role,
    nom: connexion.nom,
    prenom: connexion.prenom,
    email: connexion.email,
    password: connexion.password,
  });

  const updateFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/connexion/connexion/${connexion.user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      window.location.href = "/admin";
    } catch (err: any) { // Typé en `any`
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={updateFields}
        />
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={updateFields}
        />
        <input
          type="text"
          name="prenom"
          value={formData.prenom}
          onChange={updateFields}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={updateFields}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={updateFields}
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default EditUser;
