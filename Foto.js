import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { storage } from './service/firebaseConfig';
import { ref, uploadBytes, listAll, deleteObject, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';

export default function Foto() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const handleImageChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  const handleUpload = async () => {
    if (selectedImage && user) {
      setLoading(true);
      const response = await fetch(selectedImage);
      const blob = await response.blob();

      const storageRef = ref(storage, `images/${user.uid}/${new Date().toISOString()}`);
      uploadBytes(storageRef, blob)
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

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={{ uri: item }}
        style={{ width: '50%', height: 100, marginRight: 10 }}
      />
      <TouchableOpacity
        onPress={() => handleDelete(item)}
        disabled={loading}
        style={styles.deleteButton}
      >
        <Text style={styles.buttonText}>{loading ? 'Excluindo...' : 'Excluir'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ backgroundColor: 'black', color: 'white', padding: 20, flex: 1 }}>
      <Text style={{ color: 'white', fontSize: 24 }}>Fotos na Nuvem</Text>
      <TouchableOpacity
        onPress={handleImageChange}
        style={[styles.button, { marginBottom: 10 }]}
      >
        <Text style={styles.buttonText}>Selecionar Imagem</Text>
      </TouchableOpacity>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: '50%', height: 100, marginVertical: 10 }}
        />
      )}
      <TouchableOpacity
        onPress={handleUpload}
        disabled={loading}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{loading ? 'Enviando...' : 'Enviar'}</Text>
      </TouchableOpacity>
      <Text style={{ color: 'white', fontSize: 20, marginTop: 20 }}>Imagens Salvas</Text>
      {loading && <ActivityIndicator size="large" color="#00ff00" />}
      <FlatList
        data={imageList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    flex: 1,
  }
});
