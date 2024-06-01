import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Auth from "../context/Auth";
import AuthAdmin from "../context/AuthAdmin";
import "../style/styleLogin.css";

// Définition des types pour les props si nécessaire (pas de props dans ce composant pour l'instant)
interface LogProps {}

const Log: React.FC<LogProps> = () => {
  // Typage explicite des états
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showAuthAdminModal, setShowAuthAdminModal] = useState<boolean>(false);

  const handleShowAuthModal = () => setShowAuthModal(true);
  const handleCloseAuthModal = () => setShowAuthModal(false);
  const handleShowAuthAdminModal = () => setShowAuthAdminModal(true);
  const handleCloseAuthAdminModal = () => setShowAuthAdminModal(false);

  return (
    <div className="container">
      <button className="button" onClick={handleShowAuthModal}>Employé</button>
      <button className="button" onClick={handleShowAuthAdminModal}>Admin</button>

      <Modal show={showAuthModal} onHide={handleCloseAuthModal}>
        <Modal.Body>
          <Auth />
        </Modal.Body>
      </Modal>

      <Modal show={showAuthAdminModal} onHide={handleCloseAuthAdminModal}>
        <Modal.Body>
          <AuthAdmin />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Log;
