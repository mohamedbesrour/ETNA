import React, { Fragment, useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  modele: string;
  annee: string;
  kilometrage: string;
  prix: string;
  img: string;
}

const InputVoiture: React.FC = () => {
  // État local pour stocker les données du formulaire
  const [formData, setFormData] = useState<FormData>({
    modele: "",
    annee: "",
    kilometrage: "",
    prix: "",
    img: "",
  });

  const { modele, annee, kilometrage, prix, img } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { modele, annee, kilometrage, prix, img };
      const response = await fetch("http://localhost:5000/voiture/voiture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        window.location.href = "/"; // Redirection si la requête POST réussit
      } else {
        console.error("Failed to submit form"); // Message d'erreur si la requête échoue
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
      <h1 className="text-center mt-5">Ajouter un nouveau véhicule</h1>
      <form className="d-flex flex-column align-items-center mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control mb-3"
          name="modele"
          value={modele}
          onChange={onChange}
          placeholder="Modèle de voiture"
        />
        <input
          type="text"
          className="form-control mb-3"
          name="annee"
          value={annee}
          onChange={onChange}
          placeholder="Année du véhicule"
        />
        <input
          type="text"
          className="form-control mb-3"
          name="kilometrage"
          value={kilometrage}
          onChange={onChange}
          placeholder="Kilométrage"
        />
        <input
          type="text"
          className="form-control mb-3"
          name="prix"
          value={prix}
          onChange={onChange}
          placeholder="Prix"
        />
        <input
          type="text"
          className="form-control mb-3"
          name="img"
          value={img}
          onChange={onChange}
          placeholder="Photo du véhicule"
        />
        <button className="btn btn-success">Valider</button>
      </form>
    </Fragment>
  );
};

export default InputVoiture;