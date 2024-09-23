CREATE DATABASE garage;

CREATE TABLE
    commentaire (
        commentaire_id SERIAL PRIMARY KEY,
        description VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
        voiture_id INT REFERENCES voiture(voiture_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE
    voiture(
        voiture_id SERIAL PRIMARY KEY,
        modele VARCHAR(255),
        annee VARCHAR(255),
        kilometrage VARCHAR(255),
        prix VARCHAR(255),
        img VARCHAR(999)
    );
CREATE TABLE
    connexion(
        user_id SERIAL PRIMARY KEY,
        role VARCHAR(255),
        nom VARCHAR(255),
        prenom VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255)
    );
CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  password VARCHAR(255)
);
CREATE TABLE admin (
  email VARCHAR(255) PRIMARY KEY,
  password VARCHAR(255)
);
CREATE TABLE galerie (
    galerie_id SERIAL PRIMARY KEY,
    voiture_id INT REFERENCES voiture(voiture_id) ON DELETE CASCADE,
    img_url VARCHAR(999) NOT NULL
);

-- SELECT 
--     commentaire.commentaire_id,
--     commentaire.description,
--     commentaire.created_at,
--     users.email,
--     users.password
-- FROM 
--     commentaire
-- LEFT JOIN 
--     users ON commentaire.email = users.email;



-- CREATE DATABASE garageauto;
-- CREATE TABLE garage (
--     id_garage SERIAL PRIMARY KEY,
--     nom VARCHAR(255) NOT NULL,
--     adresse TEXT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- CREATE TABLE role (
--     id SERIAL PRIMARY KEY,
--     superadmin BOOLEAN DEFAULT FALSE,
--     admin BOOLEAN DEFAULT FALSE,
--     employe BOOLEAN DEFAULT FALSE,
--     user_id INT REFERENCES users(user_id) ON DELETE CASCADE
-- );
-- CREATE TABLE users (
--     user_id SERIAL PRIMARY KEY,
--     nom VARCHAR(255),
--     prenom VARCHAR(255),
--     password VARCHAR(255),
--     id_garage INT REFERENCES garage(id_garage) ON DELETE SET NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- CREATE TABLE voiture (
--     voiture_id SERIAL PRIMARY KEY,               
--     modele VARCHAR(255),                          
--     annee VARCHAR(255),                           
--     kilometrage VARCHAR(255),                     
--     prix VARCHAR(255),                            
--     img VARCHAR(999),                             
--     id_garage INT REFERENCES garage(id_garage) ON DELETE SET NULL, 
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
-- );
-- CREATE TABLE commentaire (
--     commentaire_id SERIAL PRIMARY KEY, 
--     nomVisteur VARCHAR(255),
--     prenomVisteur VARCHAR(255),
--     description VARCHAR(255),                     
--     id_garage INT REFERENCES garage(id_garage) ON DELETE CASCADE, 
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
-- );