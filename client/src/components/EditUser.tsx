import React, { useState } from "react";

interface Utilisateur {
  email: string;
  password: string;
}

interface EditUserProps {
  user: Utilisateur;
}

const EditUser: React.FC<EditUserProps> = ({ user }) => {
  const [formData, setFormData] = useState<Utilisateur>({
    email: user.email,
    password: user.password,
  });

  const updateFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/users/${user.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      window.location.href = "/admin";
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
      <h2>Edit User</h2>
      <form onSubmit={onSubmitForm}>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
