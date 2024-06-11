import React, { useEffect, useState, Fragment } from "react";
import "../style/home.css";
import Banniere from "../image/banniereGarageAuto.jpg";
import imageHome from "../image/mecanicien2.png";
import imageHome2 from "../image/mecanicien3.png";
import InputTodo from "../components/InputTodo";

interface Todo {
  commentaire_id: number;
  description: string;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch comments
  const getTodos = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/commentaire/todos`);
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <div className="banner">
        <img src={Banniere} alt="Garage Banner" className="img-banner" />
      </div>

      <div className="titrePolice">
        <h1>AutoPro Garage</h1>
      </div>

      <section>
        <article className="my-section">
          <div className="div1">
            <div className="containerHoraire">
              <h3 className="titleHoraire">Nos Horaires d'ouverture</h3>
              <div className="blocHoraire">
                <li className="houre-li">lun : 08:45 - 12:00 | 14:00 - 18:00</li>
                <li className="houre-li">mar : 08:45 - 12:00 | 14:00 - 18:00</li>
                <li className="houre-li">mer : 08:45 - 12:00 | 14:00 - 18:00</li>
                <li className="houre-li">jeu : 08:45 - 12:00 | 14:00 - 18:00</li>
                <li className="houre-li">ven : 08:45 - 12:00 | 14:00 - 18:00</li>
                <li className="houre-li">sam : 08:45 - 12:00</li>
                <li className="houre-li">dim : Fermé</li>
              </div>
            </div>
          </div>
          <div className="div2">
            <img src={imageHome} alt="Mecanicien" className="img-Home" />
          </div>
        </article>

        <article className="my-section">
          <div className="div3">
            <img src={imageHome2} alt="Mecanicien" className="img-Home2" />
          </div>
          <div className="div4">
            <InputTodo />
          </div>
        </article>
      </section>

      <div className="homeTableCommentaire">
        <table className="table">
          <thead>
            <tr>
              <th>Commentaire</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((commentaire) => (
              <tr key={commentaire.commentaire_id}>
                <td>{commentaire.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Home;
