import React from "react";
import BanniereServices from "../image/imgServices/atelierGarageAuto.jpg";
import Image1 from "../image/imgServices/1revision.png";
import Image2 from "../image/imgServices/2vidange.png";
import Image3 from "../image/imgServices/3entretien.png";
import Image4 from "../image/imgServices/4pneumatique.png";
import Image5 from "../image/imgServices/5reprogrammation.png";
import Image6 from "../image/imgServices/6echappement.png";
import Image7 from "../image/imgServices/7mecanique.png";
import Image8 from "../image/imgServices/8freins.png";
import "../style/services.css";
import "../style/outils/police.css";

interface Props {}

const Services: React.FC<Props> = () => {
  return (
    <>
      <div className="bannerServices">
        <img src={BanniereServices} alt="ImageRévision" className="img-banner" />
      </div>

      <div className="page-services">
        <div className="titrePolice">
          <h1 className="h1Services">Nos services</h1>
        </div>

        <div className="container-reparation">
          <div className="bloc-reparation">
            <h3 className="title-reparation">Révision</h3>
            <a href="#revision">
              <img src={Image1} alt="ImageRévision" className="img-reparation" />
            </a>
          </div>

          <div className="bloc-reparation">
            <h3 className="title-reparation">Vidange</h3>
            <a href="#vidange">
              <img src={Image2} alt="ImageVidange" className="img-reparation" />
            </a>
          </div>

          <div className="bloc-reparation">
            <h3 className="title-reparation">Entretien</h3>
            <a href="#entretien">
              <img src={Image3} alt="ImageEntretien" className="img-reparation" />
            </a>
          </div>

          <div className="bloc-reparation">
            <h3 className="title-reparation">Pneumatique</h3>
            <a href="#pneumatique">
              <img src={Image4} alt="ImagePneumatique" className="img-reparation" />
            </a>
          </div>

          <div className="bloc-reparation">
            <h3 className="title-reparation">Reprogrammation</h3>
            <a href="#reprogrammation">
              <img src={Image5} alt="ImageReprogrammation" className="img-reparation" />
            </a>
          </div>

          <div className="bloc-reparation">
            <h3 className="title-reparation">Echappement</h3>
            <a href="#echappement">
              <img src={Image6} alt="ImageEchappement" className="img-reparation" />
            </a>
          </div>

          <div className="bloc-reparation">
            <h3 className="title-reparation">Mécanique</h3>
            <a href="#mecanique">
              <img src={Image7} alt="ImageMécanique" className="img-reparation" />
            </a>
          </div>

          <div className="bloc-reparation">
            <h3 className="title-reparation">Freins</h3>
            <a href="#freins">
              <img src={Image8} alt="ImageFreins" className="img-reparation" />
            </a>
          </div>
        </div>

        <div className="container-repa-about">
          <div className="bloc-repa-about" id="revision">
            <h3 className="title-repa-about">Révision</h3>
            <p>
              QU'EST-CE QUE LA RÉVISION ? La révision de la voiture consiste à
              examiner, à intervalles réguliers, les différents composants d'un
              véhicule. Ces visites permettent de conserver un bon entretien de
              votre véhicule, et contribue à sa fiabilité, sa performance et sa
              longévité.
            </p>
          </div>
          
          <div className="bloc-repa-about" id="vidange">
            <h3 className="title-repa-about">Vidange</h3>
            <p>
              Il est généralement préconisé de procéder à une vidange tous les
              15 000 à 30 000 km. Si vous faites peu de kilomètres, il est
              recommandé de faire une vidange au moins une fois par an,
              notamment avant un long voyage.
            </p>
          </div>

          <div className="bloc-repa-about" id="entretien">
            <h3 className="title-repa-about">Entretien</h3>
            <p>
              Vérifier les freins (plaquettes, disques…), la direction (volant,
              rotules de direction…), les phares et les feux, la batterie et les
              balais d'essuie-glace. Contrôler l'état, l'usure et la pression
              des pneus, y compris la roue de secours. Nettoyez régulièrement
              les feux et les phares.
            </p>
          </div>

          <div className="bloc-repa-about" id="pneumatique">
            <h3 className="title-repa-about">Pneumatique</h3>
            <p>
              Un pneu, apocope de pneumatique, forme abrégée de bandage
              pneumatique, est, par opposition au bandage plein, un objet à
              l'état solide, souple, de forme torique, fabriqué à partir de
              gomme, de textiles et de métaux.
            </p>
          </div>

          <div className="bloc-repa-about" id="reprogrammation">
            <h3 className="title-repa-about">Reprogrammation</h3>
            <p>
              La reprogrammation moteur est une technique qui consiste à
              modifier les données du moteur afin d'en optimiser le
              fonctionnement. Cette pratique permet notamment d'augmenter la
              puissance du moteur, de réduire la consommation de carburant ou
              encore d'améliorer le confort de conduite.
            </p>
          </div>

          <div className="bloc-repa-about" id="echappement">
            <h3 className="title-repa-about">Echappement</h3>
            <p>
              À quoi sert le système d'échappement ? Dans un véhicule, le
              système d'échappement désigne le circuit permettant de rediriger
              tous les gaz de combustion provenant du moteur, la plus souvent situé à 
              l'avant du véhicule, vers l'arrière de celui-ci, avant de 
              relâcher ces gaz vers l'extérieur.
            </p>
          </div>

          <div className="bloc-repa-about" id="mecanique">
            <h3 className="title-repa-about">Mécanique</h3>
            <p>
              La batterie de la voiture fournit un courant qui permet de générer
              un champ électromagnétique, grâce à la présence de la partie
              aimanté du moteur. Ce champ électromagnétique créé alors une force
              sur la bobine et la fait tourner. Cela entraîne le mouvement de
              l'axe et donc des roues du véhicule.
            </p>
          </div>

          <div className="bloc-repa-about" id="freins">
            <h3 className="title-repa-about">Freins</h3>
            <p>
              Les freins de voiture sont situés au niveau des roues du véhicule.
              Il y a un frein pour chaque roue. Nous retrouverons donc deux
              freins sur une moto et quatre freins sur une voiture. Le
              fonctionnement des freins d'une voiture est réparti entre l'avant
              et l'arrière, de manière à équilibrer le véhicule.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;