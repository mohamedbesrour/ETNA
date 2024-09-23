// src/components/ListGalerie.tsx

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";

interface ImageGalerie {
  galerie_id: number;
  voiture_id: number;
  img_url: string;
}

interface Props {
  voitureId: number;
}

const ListGalerie: React.FC<Props> = ({ voitureId }) => {
  const [images, setImages] = useState<ImageGalerie[]>([]);
  const [newImageUrl, setNewImageUrl] = useState<string>("");
  const [editImageId, setEditImageId] = useState<number | null>(null);
  const [editImageUrl, setEditImageUrl] = useState<string>("");

  // Récupérer les images de la galerie pour la voiture spécifiée
  const fetchGalerie = async () => {
    try {
      const response = await fetch(`http://localhost:5000/voiture/galerie/${voitureId}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des images");
      }
      const data: ImageGalerie[] = await response.json();
      setImages(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGalerie();
  }, [voitureId]);

  // Ajouter une nouvelle image
  const handleAddImage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/voiture/galerie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voiture_id: voitureId, img_url: newImageUrl }),
      });

      if (response.ok) {
        setNewImageUrl("");
        fetchGalerie();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erreur lors de l'ajout de l'image");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Supprimer une image
  const handleDeleteImage = async (id: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) return;

    try {
      const response = await fetch(`http://localhost:5000/voiture/galerie/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchGalerie();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erreur lors de la suppression de l'image");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Initier l'édition d'une image
  const handleEditInit = (id: number, currentUrl: string) => {
    setEditImageId(id);
    setEditImageUrl(currentUrl);
  };

  // Annuler l'édition
  const handleEditCancel = () => {
    setEditImageId(null);
    setEditImageUrl("");
  };

  // Soumettre la modification d'une image
  const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editImageId === null || !editImageUrl.trim()) return;

    try {
      const response = await fetch(`http://localhost:5000/voiture/galerie/${editImageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ img_url: editImageUrl }),
      });

      if (response.ok) {
        setEditImageId(null);
        setEditImageUrl("");
        fetchGalerie();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erreur lors de la modification de l'image");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="gallery-management">
      <h3>Gestion de la Galerie</h3>
      <form onSubmit={handleAddImage}>
        <input
          type="text"
          placeholder="URL de l'image"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          required
        />
        <button type="submit">Ajouter Image</button>
      </form>

      <ul className="gallery-list">
        {images.map((image) => (
          <li key={image.galerie_id} className="gallery-item">
            {editImageId === image.galerie_id ? (
              <form onSubmit={handleEditSubmit} className="edit-form">
                <input
                  type="text"
                  value={editImageUrl}
                  onChange={(e) => setEditImageUrl(e.target.value)}
                  required
                />
                <button type="submit">Sauvegarder</button>
                <button type="button" onClick={handleEditCancel}>
                  Annuler
                </button>
              </form>
            ) : (
              <>
                <img src={image.img_url} alt={`Galerie ${image.galerie_id}`} className="gallery-image" />
                <div className="gallery-actions">
                  <button onClick={() => handleEditInit(image.galerie_id, image.img_url)}>Modifier</button>
                  <button onClick={() => handleDeleteImage(image.galerie_id)}>Supprimer</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGalerie;