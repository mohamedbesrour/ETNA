import React, { useState } from "react";

interface Voiture {
  voiture_id: string; // Ajouté number plus tard
  modele: string;
  annee: string;
  kilometrage: string;
  prix: string;
  img: string;
}

interface Props {
  voiture: Voiture;
}

const EditVoiture: React.FC<Props> = ({ voiture }) => {
  const [formData, setFormData] = useState<Voiture>({
    voiture_id: voiture.voiture_id, // Ajouté
    modele: voiture.modele,
    annee: voiture.annee,
    kilometrage: voiture.kilometrage,
    prix: voiture.prix,
    img: voiture.img,
  });

  const updateFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/voiture/voiture/${voiture.voiture_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      window.location.href = "/admin";
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Edit Voiture</h2>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="modele"
          value={formData.modele}
          onChange={updateFields}
        />
        <input
          type="number"
          name="annee"
          value={formData.annee}
          onChange={updateFields}
        />
        <input
          type="number"
          name="kilometrage"
          value={formData.kilometrage}
          onChange={updateFields}
        />
        <input
          type="number"
          name="prix"
          value={formData.prix}
          onChange={updateFields}
        />
        <input
          type="text"
          name="img"
          value={formData.img}
          onChange={updateFields}
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default EditVoiture;
