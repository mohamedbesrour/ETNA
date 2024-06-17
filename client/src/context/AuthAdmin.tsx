import React, { useState } from "react";
import { useCookies } from "react-cookie";
import "../style/auth.css";

const AuthAdmin: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["Email", "AuthToken"]);
  const [isLogIn, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string | null>(null); // Stocke les valeurs des champs de formulaire
  const [password, setPassword] = useState<string | null>(null); // Stocke les valeurs
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); 

  // Change le statut connexion ou inscription
  const viewLogin = (status: boolean) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e: React.FormEvent, endpoint: string) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut
    if (!isLogIn && password !== confirmPassword) {
      // Vérification si le mdp correspond
      setError("Le mot de passe ne correspond pas");
      return;
    }

    // Validation de l'email REGEX
    const emailRegex = /^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+$/; 
    if (!emailRegex.test(email || "")) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    console.log(`${process.env.REACT_APP_SERVERURLACCESSADMIN}/${endpoint}`);
    const response = await fetch(
      `${process.env.REACT_APP_SERVERURLACCESSADMIN}/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    if (data.detail) {
      setError(data.detail);
    } else {
      // Si aucune erreur définit les cookies d'email et Tkn d'auth
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      window.location.href = "http://localhost:3000/admin";
      alert("Bienvenue, admin !");
      // window.location.reload();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h1>administrateur</h1>
          <h2>{isLogIn ? "Connectez-vous" : "Inscrivez-vous"}</h2>
          <input
            type="texte"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogIn && (
            <input
              type="password"
              placeholder="confirmé mot de passe"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
          />
          {error && <p>{error}</p>}
        </form>


        {/* <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogIn ? "rgb(188, 188, 188)" : "rgb(255, 255, 255)",
            }}
          >
            Sign Up 
           </button> 
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogIn ? "rgb(188, 188, 188)" : "rgb(255, 255, 255)",
            }}
          >
            LogIn
          </button>
        </div>*/}
      </div>
    </div>
  );
};

export default AuthAdmin;
