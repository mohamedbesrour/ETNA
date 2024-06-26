import React, { useContext, useEffect, useState } from "react";
import "../style/admin.css";

import InputVoiture from "../components/InputVoiture";
import ListVoiture from "../components/ListVoiture";

import InputUser from "../components/InputUser";
import ListUsers from "../components/ListUsers";

import { Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AuthContext } from "../context/AuthContext";

interface AdminProps {}

const Admin: React.FC<AdminProps> = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['Email', 'access_token', 'AuthToken', '_gid', '_ga']); // Utilisez la syntaxe correcte pour obtenir la fonction removeCookie

  const { isConnect } = useContext(AuthContext);//supp cookies logout

  // useEffect(() => {}, []);
  // const [exampleState, setExampleState] = useState(null);

  const signOut = () => {
    try {
      console.log("signout");
      removeCookie("Email");
      removeCookie("access_token");
      removeCookie("AuthToken");
      removeCookie("_gid");
      removeCookie("_ga");
      navigate("/connexion"); // Déplacez la navigation après la suppression des cookies
      window.location.reload();
    } catch (err) {
      console.error("error: ", err);
    }
  };
  
  if (isConnect) {
    return (
      <div className="pageAdmin">
        admin
        <button className="signout" onClick={signOut}>
          SIGN OUT
        </button>
        <InputVoiture />
        Voiture disponible
        <ListVoiture />
        connexion
        <InputUser />
        Liste des utilisateurs
        <ListUsers />
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
}

export default Admin;