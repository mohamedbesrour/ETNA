// src/components/ListVoiture.tsx

import React, { Fragment, useEffect, useState } from "react";
import EditVoiture from "./EditVoiture";
import ListGalerie from "./ListGalerie"; // Import du composant de gestion de la galerie
import Modal from "../components/Modal"; // Assurez-vous d'avoir un composant Modal

interface Voiture {
  voiture_id: number;
  modele: string;
  annee: string;
  kilometrage: string;
  prix: string;
  img: string;
}

const ListVoitures: React.FC = () => {
  const [voitures, setVoitures] = useState<Voiture[]>([]);
  const [showGalleryModal, setShowGalleryModal] = useState<boolean>(false);
  const [selectedVoiture, setSelectedVoiture] = useState<Voiture | null>(null);

  const deleteVoiture = async (id: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette voiture ?")) return;

    try {
      const response = await fetch(`http://localhost:5000/voiture/voiture/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setVoitures(voitures.filter((voiture) => voiture.voiture_id !== id));
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erreur lors de la suppression de la voiture");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getVoitures = async () => {
    try {
      const response = await fetch("http://localhost:5000/voiture/voiture");
      const jsonData: Voiture[] = await response.json();
      setVoitures(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVoitures();
  }, []);

  const handleManageGallery = (voiture: Voiture) => {
    setSelectedVoiture(voiture);
    setShowGalleryModal(true);
  };

  const closeGalleryModal = () => {
    setSelectedVoiture(null);
    setShowGalleryModal(false);
  };

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
            <th>Gérer Galerie</th> {/* Nouvelle colonne */}
          </tr>
        </thead>
        <tbody>
          {voitures.map((voiture) => (
            <tr key={voiture.voiture_id}>
              <td>{voiture.modele}</td>
              <td>{voiture.annee}</td>
              <td>{voiture.kilometrage}</td>
              <td>{voiture.prix}</td>
              <td>
                <img src={voiture.img} alt={voiture.modele} className="thumbnail" />
              </td>
              <td>
                <EditVoiture voiture={voiture} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteVoiture(voiture.voiture_id)}
                >
                  Supprimer
                </button>
              </td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleManageGallery(voiture)}
                >
                  Gérer Galerie
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal pour gérer la galerie */}
      {showGalleryModal && selectedVoiture && (
        <Modal isOpen={showGalleryModal} onClose={closeGalleryModal}>
          <h2>Gestion de la Galerie pour {selectedVoiture.modele}</h2>
          <ListGalerie voitureId={selectedVoiture.voiture_id} />
          <button onClick={closeGalleryModal} className="btn btn-close">
            Fermer
          </button>
        </Modal>
      )}
    </Fragment>
  );
};

export default ListVoitures;
