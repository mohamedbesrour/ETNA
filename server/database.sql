CREATE DATABASE velo;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255)
);

CREATE TABLE utilisateurs (
    id_utilisateur SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL CHECK (role IN ('admin', 'user'))
);

CREATE TABLE produits (
    id_produit SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    categorie VARCHAR(255),  
    description VARCHAR(255),
    image VARCHAR(999),
    prix DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE commandes (
    id_commande SERIAL PRIMARY KEY,
    id_utilisateur INTEGER REFERENCES utilisateurs(id_utilisateur),
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut_commande VARCHAR(255)
);

CREATE TABLE details_commande (
    id_detail_commande SERIAL PRIMARY KEY,
    id_commande INTEGER REFERENCES commandes(id_commande),
    id_produit INTEGER REFERENCES produits(id_produit),
    quantite INTEGER,
    prix_unitaire DECIMAL(10, 2) NOT NULL
);

CREATE TABLE historique_commande (
    id_historique SERIAL PRIMARY KEY,
    id_utilisateur INTEGER REFERENCES utilisateurs(id_utilisateur),
    id_commande INTEGER REFERENCES commandes(id_commande),
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO velo (nom, marque, type, couleur, materiau, prix, description, image, note_moyenne) VALUES ('VTT tout terrain', 'Giant', 'VTT', 'Noir', 'Aluminium', 899.99, 'Vélo tout terrain robuste pour les aventures en plein air.', 'https://contents.mediadecathlon.com/p2623168/k$f398192b4f98e6df8359d2b4210d2988/sq/velo-vtt-randonnee-st-50-noir-26.jpg?format=auto&f=1800x1800', 4);

-- CREATE TABLE Panier (
--     id INT PRIMARY KEY,
--     userId INT,
--     productId INT,
--     quantity INT,
--     FOREIGN KEY (userId) REFERENCES Utilisateur(id),
--     FOREIGN KEY (productId) REFERENCES Produit(id)
-- );