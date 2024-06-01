import React, { useState } from "react";
import { useCookies } from "react-cookie";
import "../style/auth.css";

const AuthAdmin: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["Email", "AuthToken"]);
  const [isLogIn, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string | null>(null); // Stocke les valeurs des champs de formulaire
  const [password, setPassword] = useState<string | null>(null); // Stocke les valeurs ...
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null); // Stocke les valeurs ...
  const [error, setError] = useState<string | null>(null); // Affiche le message d'erreur

  // Change le statut connexion ou inscription et réinitialise les messages d'erreur
  const viewLogin = (status: boolean) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e: React.FormEvent, endpoint: string) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut
    if (!isLogIn && password !== confirmPassword) {
      // Vérifie si les mots de passe correspondent lors de l'inscription
      setError("Le mot de passe ne correspond pas");
      return;
    }

    // Validation de l'email avec une expression régulière
    const emailRegex = /^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+$/; // Lettres avant "@" lettres entre "." lettres après.
    if (!emailRegex.test(email || "")) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    console.log(`${process.env.REACT_APP_SERVERURLACCESSADMIN}/${endpoint}`);
    // Effectue une requête POST vers le serveur avec les informations d'authentification
    const response = await fetch(
      `${process.env.REACT_APP_SERVERURLACCESSADMIN}/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // En-têtes de la requête
        body: JSON.stringify({ email, password }), // Corps de la requête (données au format JSON)
      }
    );

    const data = await response.json(); // Convertit la réponse en format JSON
    if (data.detail) {
      // Vérifie s'il y a une erreur dans la réponse
      setError(data.detail); // Définit un message d'erreur
    } else {
      // Si aucune erreur n'est retournée
      // Définit les cookies d'email et de jeton d'authentification avec les données de réponse
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      // Recharge la page pour appliquer les changements (par exemple, rediriger l'utilisateur connecté)
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


        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogIn ? "rgb(188, 188, 188)" : "rgb(255, 255, 255)",
            }}
          >
            Sign Up
           </button>{/* couleur  */}
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogIn ? "rgb(188, 188, 188)" : "rgb(255, 255, 255)",
            }}
          >
            LogIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthAdmin;
