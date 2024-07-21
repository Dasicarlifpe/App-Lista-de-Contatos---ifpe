import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
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
        style={{
          marginTop: 5,
          padding: 5,
          borderRadius: 10,
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#000',
          alignItems: 'center'
        }}
      >
        <Text>{loading ? 'Excluindo...' : 'Excluir'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ backgroundColor: 'black', color: 'white', padding: 20, flex: 1 }}>
      <Text style={{ color: 'white', fontSize: 24 }}>Gerenciador de Imagens</Text>
      <Button
        title="Selecionar Imagem"
        onPress={handleImageChange}
        color="#841584"
      />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: '50%', height: 100, marginVertical: 10 }}
        />
      )}
      <Button
        title={loading ? 'Enviando...' : 'Enviar'}
        onPress={handleUpload}
        disabled={loading}
      />
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
