import React, { Fragment, useEffect, useState } from "react";
import Modal from "../components/Modal";
import "../style/vente.css";
import "../style/outils/police.css";

interface Voiture {
  voiture_id: number;
  img: string;
  modele: string;
  annee: string;
  kilometrage: string;
  prix: string;
}

interface Props {}

const Vente: React.FC<Props> = () => {
  const [voitures, setVoitures] = useState<Voiture[]>([]);
  const [recherche, setRecherche] = useState<{ kilometrage: string; prix: string }>({ kilometrage: "", prix: "" });
  const [resultat, setResultat] = useState<Voiture[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<Voiture | null>(null);

  const getVoitures = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/voiture/voiture`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des voitures');
      }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecherche({ ...recherche, [name]: value });
  };

  const handleSearch = () => {
    const { kilometrage, prix } = recherche;
    const filteredVoitures = voitures.filter(voiture => 
      (!kilometrage || parseInt(voiture.kilometrage) <= parseInt(kilometrage)) && 
      (!prix || parseInt(voiture.prix) <= parseInt(prix))
    );
    setResultat(filteredVoitures);
  };

  const handleCardClick = (voiture: Voiture) => {
    setSelectedCar(voiture);
    setIsModalOpen(true);
  };

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  return (
    <Fragment>
      <h1 className="h1Services">Découvrez notre sélection de véhicules d'occasion</h1>
      <div className="pageVente">
        <div className="filters">
          <input type="range" name="kilometrage" min="0" max="200000" value={recherche.kilometrage} onChange={handleChange} />
          <input type="text" name="prix" value={recherche.prix} onChange={handleChange} placeholder="Prix maximum" />
          <button onClick={handleSearch}>Filtrer</button>
        </div>
        <div className="car-grid">
          {resultat.length > 0 ? resultat.map((voiture) => (
            <div className="car-card large-card" key={voiture.voiture_id} onClick={() => handleCardClick(voiture)}>
              <div className="car-image"><img src={voiture.img} alt="photo de la voiture" /></div>
              <div className="car-info">
                <h2>{voiture.modele}</h2>
                <p>Année : {voiture.annee}</p>
                <p>Kilométrage : {voiture.kilometrage}</p>
                <p>Prix : {voiture.prix}€</p>
                <button className="info-btn">Info</button>
              </div>
            </div>
          )) : voitures.map((voiture) => (
            <div className="car-card large-card" key={voiture.voiture_id} onClick={() => handleCardClick(voiture)}>
              <div className="car-image"><img src={voiture.img} alt="photo de la voiture" /></div>
              <div className="car-info">
                <h2>{voiture.modele}</h2>
                <p>Année : {voiture.annee}</p>
                <p>Kilométrage : {voiture.kilometrage}</p>
                <p>Prix : {voiture.prix}€</p>
                <button className="info-btn">Info</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div>
            <h2>Informations du véhicule</h2>
            <img src={selectedCar?.img} alt="photo de la voiture" />
            <p>Modèle: {selectedCar?.modele}</p>
            <p>Année: {selectedCar?.annee}</p>
            <p>Kilométrage: {selectedCar?.kilometrage}</p>
            <p>Prix: {selectedCar?.prix}€</p>
            <p>Email de contact: contact@exemple.com</p>
            <p>Téléphone de contact: +33 1 23 45 67 89</p>
          </div>
        </Modal>
      )}
    </Fragment>
  );
}

export default Vente;
