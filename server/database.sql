CREATE DATABASE velo;

CREATE TABLE Utilisateur (
    id INT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE Produit (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    price FLOAT,
    stock INT
);

CREATE TABLE Panier (
    id INT PRIMARY KEY,
    userId INT,
    productId INT,
    quantity INT,
    FOREIGN KEY (userId) REFERENCES Utilisateur(id),
    FOREIGN KEY (productId) REFERENCES Produit(id)
);

CREATE TABLE Commande (
    id INT PRIMARY KEY,
    userId INT,
    productId INT,
    quantity INT,
    totalPrice FLOAT,
    status VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES Utilisateur(id),
    FOREIGN KEY (productId) REFERENCES Produit(id)
);








-- CREATE TABLE `moto` (
--   `Moto_ID` int(11) NOT NULL,
--   `Title` varchar(255) NOT NULL,
--   `Modele` varchar(255) NOT NULL,
--   `Marque` varchar(255) NOT NULL,
--   `CreationDate` date NOT NULL,
--   `Year` int(11) NOT NULL,
--   `Origin` varchar(255) DEFAULT NULL,
--   `FirstHand` tinyint(1) DEFAULT NULL,
--   `OdometerMileage` int(11) DEFAULT NULL,
--   `Energy` varchar(255) DEFAULT NULL,
--   `Gearbox` varchar(255) DEFAULT NULL,
--   `Color` varchar(255) DEFAULT NULL,
--   `NumberOfPlaces` int(11) DEFAULT NULL,
--   `FiscalPower` int(11) DEFAULT NULL,
--   `Powers` int(11) DEFAULT NULL,
--   `Price` int(11) DEFAULT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- CREATE TABLE `message` (
--   `Message_ID` int(11) NOT NULL,
--   `FirstNameVisiter` varchar(255) DEFAULT NULL,
--   `LastNameVisiter` varchar(255) DEFAULT NULL,
--   `EmailVisiter` varchar(255) DEFAULT NULL,
--   `Objet` varchar(255) NOT NULL,
--   `Message` text DEFAULT NULL,
--   `User_ID` int(11) DEFAULT NULL,
--   `Moto_ID` int(11) DEFAULT NULL,
--   `DateOfMessage` timestamp NOT NULL DEFAULT current_timestamp()
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- CREATE TABLE `user` (
--   `User_ID` int(11) NOT NULL,
--   `FirstName` varchar(255) NOT NULL,
--   `LastName` varchar(255) NOT NULL,
--   `Address` varchar(255) DEFAULT NULL,
--   `Email` varchar(255) NOT NULL,
--   `Phone` varchar(20) DEFAULT NULL,
--   `EmailVerified` tinyint(1) NOT NULL DEFAULT 0,
--   `HashedPassword` varchar(255) NOT NULL,
--   `Role_ID` int(11) DEFAULT NULL,
--   `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
--   `UpdatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
