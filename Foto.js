import React, { useState, useEffect } from 'react';
import { storage } from './service/firebaseConfig';
import { ref, uploadBytes, listAll, deleteObject, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

export default function Foto() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedImage && user) {
      setLoading(true);
      const storageRef = ref(storage, `images/${user.uid}/${selectedImage.name}`);
      uploadBytes(storageRef, selectedImage)
        .then(() => {
          alert('Imagem enviada com sucesso!');
          fetchImages();
        })
        .catch((error) => {
          alert('Erro ao enviar imagem: ' + error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const fetchImages = () => {
    if (user) {
      setLoading(true);
      const listRef = ref(storage, `images/${user.uid}/`);
      listAll(listRef)
        .then((res) => {
          const urlPromises = res.items.map((itemRef) => getDownloadURL(itemRef));
          return Promise.all(urlPromises);
        })
        .then((urlArr) => {
          setImageList(urlArr);
        })
        .catch((error) => {
          alert('Erro ao listar imagens: ' + error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleDelete = (url) => {
    setLoading(true);
    const storageRef = ref(storage, url);
    deleteObject(storageRef)
      .then(() => {
        alert('Imagem excluída com sucesso!');
        fetchImages();
      })
      .catch((error) => {
        alert('Erro ao excluir imagem: ' + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchImages();
  }, [user]);

  return (
   <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
  <h1>Gerenciador de Imagens</h1>
  <input 
    type="file" 
    onChange={handleImageChange} 
    style={{ 
      display: 'block', 
      marginBottom: '20px', 
      padding: '10px', 
      borderRadius: '10px', 
      backgroundColor: '#fff', 
      color: '#000', 
      border: 'none', 
      cursor: 'pointer' 
    }} 
  />
  {selectedImage && (
    <img
      src={URL.createObjectURL(selectedImage)}
      alt="Selected"
      style={{ 
        maxWidth: '50%', 
        height: '100px', 
        display: 'block', 
        margin: '10px 0' 
      }}
    />
  )}
  <button 
    onClick={handleUpload} 
    disabled={loading} 
    style={{ 
      display: 'block', 
      marginTop: '20px', 
      padding: '10px 20px', 
      borderRadius: '10px', 
      backgroundColor: '#fff', 
      color: '#000', 
      border: 'none', 
      cursor: 'pointer', 
      transition: 'background-color 0.3s' 
    }}
  >
    {loading ? 'Enviando...' : 'Enviar'}
  </button>
  <h2>Imagens Salvas</h2>
  <ul style={{ listStyleType: 'none', padding: '0' }}>
    {imageList.map((url, index) => (
      <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
        <img
          src={url}
          alt={`Imagem ${index}`}
          style={{ 
            maxWidth: '50%', 
            height: '100px', 
            display: 'block', 
            marginRight: '10px' 
          }}
        />
        <button 
          onClick={() => handleDelete(url)} 
          disabled={loading} 
          style={{ 
            marginTop: '5px', 
            padding: '5px 10px', 
            borderRadius: '10px', 
            backgroundColor: '#fff', 
            color: '#000', 
            border: 'none', 
            cursor: 'pointer', 
            transition: 'background-color 0.3s' 
          }}
        >
          {loading ? 'Excluindo...' : 'Excluir'}
        </button>
      </li>
    ))}
  </ul>
</div>

  
  );
}

