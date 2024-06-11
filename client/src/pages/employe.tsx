import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import "../style/admin.css";
import InputTodo from "../components/InputTodo";
import ListTodos from "../components/ListTodos";

const Employe: React.FC = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const { isConnect } = useContext<AuthContextType>(AuthContext);

  const signOut = () => {
    try {
      console.log("signout");
      removeCookie("Email");
      removeCookie("access_token");
      removeCookie("AuthToken");
      removeCookie("_gid");
      removeCookie("_ga");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log("error : ");
      console.log(err);
    }
  };

  if (isConnect) {
    return (
      <div className="pageEmploye">
        <button className="signout" onClick={signOut}>
          Déconnexion
        </button>
        <h1>Réserver aux personnels</h1>
        <InputTodo />
        <ListTodos />
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default Employe;
