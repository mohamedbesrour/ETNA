import React, { Fragment, useEffect, useState } from "react";
import EditVoiture from "./EditVoiture";

interface Voiture {
  voiture_id: string;
  modele: string;
  annee: string;
  kilometrage: string;
  prix: string;
  img: string;
}
 
const ListVoitures = () => {

  const [voitures, setVoitures] = useState<Voiture[]>([]);

  const deleteVoiture = async (id: string) => { // Modifier le type de id en string
    try {
      await fetch(`http://localhost:5000/voiture/voiture/${id}`, {
        method: "DELETE",
      });
      setVoitures(voitures.filter((voiture) => voiture.voiture_id !== id));
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  const getVoitures = async () => {
    try {
      const response = await fetch("http://localhost:5000/voiture/voiture");
      const jsonData: Voiture[] = await response.json();
      setVoitures(jsonData);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    getVoitures();
  }, []);

  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>Modèle</th>
            <th>Année</th>
            <th>Kilométrage</th>
            <th>Montant</th>
            <th>URL image</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {voitures.map((voiture) => (
            <tr key={voiture.voiture_id}>
              <td>{voiture.modele}</td>
              <td>{voiture.annee}</td>
              <td>{voiture.kilometrage}</td>
              <td>{voiture.prix}</td>
              <td>{voiture.img}</td>
              <td>
                <EditVoiture voiture={voiture} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteVoiture(voiture.voiture_id.toString())} // Convertir id en string
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListVoitures;
