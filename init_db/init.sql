DO
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'velo') THEN
        CREATE DATABASE velo;
    END IF;
END
$$;

\connect velo
CREATE ROLE admin WITH LOGIN PASSWORD 'root';
CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS utilisateurs (
    id_utilisateur SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL CHECK (role IN ('admin', 'user'))
);
-- INSERT INTO utilisateurs (nom, prenom, email, password, role) VALUES ('besrour', 'mohamed', 'besrou_m@etna-alternance.net', 'root', user);

-- INSERT INTO produits (titre, categorie, description, image, prix, stock) VALUES ('VTT tout terrain', 'VTT', 'Vélo tout terrain robuste pour les aventures en plein air.', 'https://product-cdn-frz.alltricks.com/large/284/562284/2562284/5168255', 180, 4);
CREATE TABLE IF NOT EXISTS produits (
    id_produit SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    categorie VARCHAR(255),  
    description VARCHAR(255),
    image VARCHAR(999),
    prix DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS commandes (
    id_commande SERIAL PRIMARY KEY,
    id_utilisateur INTEGER REFERENCES utilisateurs(id_utilisateur),
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut_commande VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS details_commande (
    id_detail_commande SERIAL PRIMARY KEY,
    id_commande INTEGER REFERENCES commandes(id_commande),
    id_produit INTEGER REFERENCES produits(id_produit),
    quantite INTEGER,
    prix_unitaire DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS historique_commande (
    id_historique SERIAL PRIMARY KEY,
    id_utilisateur INTEGER REFERENCES utilisateurs(id_utilisateur),
    id_commande INTEGER REFERENCES commandes(id_commande),
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Fonction nécessaire pour pallier au ON UPDATE CURRENT_TIMESTAMP et mettre a jour update_at
CREATE OR REPLACE FUNCTION maj_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_maj_updated_at
BEFORE UPDATE ON produits
FOR EACH ROW EXECUTE FUNCTION maj_updated_at();

-- CREATE TABLE Panier (
--     id INT PRIMARY KEY,
--     userId INT,
--     productId INT,
--     quantity INT,
--     FOREIGN KEY (userId) REFERENCES Utilisateur(id),
--     FOREIGN KEY (productId) REFERENCES Produit(id)
-- );