import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Home from "../pages/home";
import Services from "../pages/services";
import Vente from "../pages/vente";
import Connexion from "../pages/connexion";
import Auth from "../context/Auth";
import AuthAdmin from "../context/AuthAdmin";
import Employe from "../pages/employe";
import Admin from "../pages/admin";
import Modal from "../components/Modal";
import Error from "../pages/error";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const [cookie, setCookie] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = async () => {
      try {
        setCookie(document.cookie);
      } catch (err) {
        console.error(err);
      }
    };
    getCookie();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/vente" element={<Vente />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/auth-employe" element={<Auth />} />
          <Route path="/auth-admin" element={<AuthAdmin />} />
          <Route path="/employe" element={<Employe />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/modal" element={<Modal />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Navigation;
