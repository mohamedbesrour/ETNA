import React, { useContext } from "react";
import "../style/admin.css";
import InputVoiture from "../components/InputVoiture";
import ListVoiture from "../components/ListVoiture";
import InputUser from "../components/InputUser";
import ListUsers from "../components/ListUsers";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AuthContext } from "../context/AuthContext";

const Admin: React.FC = () => {
  const [, , removeCookie] = useCookies(['Email', 'access_token', 'AuthToken', '_gid', '_ga']);
  const { isConnect } = useContext(AuthContext);

  const navigate = useNavigate();

  const signOut = () => {
    try {
      removeCookie("Email");
      removeCookie("access_token");
      removeCookie("AuthToken");
      removeCookie("_gid");
      removeCookie("_ga");
      navigate("/connexion");
      window.location.reload();
    } catch (err) {
      console.error("Erreur lors de la déconnexion:", err);
    }
  };

  if (isConnect) {
    return (
      <div className="pageAdmin">
        <h1>Administration</h1>
        <button className="signout" onClick={signOut}>
          SE DECONNECTER
        </button>
        <InputVoiture />
        <h2>Voitures Disponibles</h2>
        <ListVoiture />
        <h2>Gestion des Utilisateurs</h2>
        <InputUser />
        <ListUsers />
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default Admin;
