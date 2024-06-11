import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "../pages/home";
import Services from "../pages/services";
import Vente from "../pages/vente";
import Connexion from "../pages/connexion";
import Auth from "../context/Auth";
import AuthAdmin from "../context/AuthAdmin";
import Employe from "../pages/Employe";
import Admin from "../pages/admin";
import Modal from "../components/Modal";
import Error from "../pages/error";
import { AuthContext, AuthContextType } from "../context/AuthContext";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const { isConnect } = useContext<AuthContextType>(AuthContext);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/vente" element={<Vente />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/auth-employe" element={<Auth />} />
        <Route path="/auth-admin" element={<AuthAdmin />} />
        <Route path="/employe" element={isConnect ? <Employe /> : <Navigate to="/employe" />} />
        <Route path="/admin" element={isConnect ? <Admin /> : <Navigate to="/admin" />} />
        <Route path="/modal" element={<Modal isOpen={false} onClose={() => {}}>Contenu de la modal</Modal>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Navigation;
