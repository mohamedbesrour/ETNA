import React, { useState, useContext } from "react";
import { useCookies } from "react-cookie";
import "../style/auth.css";
import { AuthContext, AuthContextType } from "../context/AuthContext";

const Auth: React.FC = () => {
  const { login } = useContext<AuthContextType>(AuthContext);
  const [cookies, setCookie] = useCookies(["Email", "AuthToken"]);
  const [isLogIn, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const viewLogin = (status: boolean) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e: React.FormEvent, endpoint: string) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Le mot de passe ne correspond pas");
      return;
    }

    const emailRegex = /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]+$/;
    if (!emailRegex.test(email || "")) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_SERVERURLACCESS}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      login();
      window.location.href = "/employe";
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h1>collaborateur</h1>
          <h2>{isLogIn ? "Connectez-vous" : "Inscrivez-vous"}</h2>
          <input
            type="text"
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
            style={{ backgroundColor: !isLogIn ? "rgb(188, 188, 188)" : "rgb(255, 255, 255)" }}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{ backgroundColor: isLogIn ? "rgb(188, 188, 188)" : "rgb(255, 255, 255)" }}
          >
            LogIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
