import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';

const Cadastro = ({navigation}) => {
  const [name, setName] = useState('');
  const [metragem, setMetragem] = useState('');
  const [price, setPrice] = useState('');
  const [rooms, setRooms] = useState('');
  const [parking, setParking] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setImg(imageUri);
      }
    });
  };

  const RenderImg = () => {
    if (img) {
      return <Image source={{uri: img}} style={style.img} />;
    } else {
      return <Icon name="camera" style={style.icon}></Icon>;
    }
  };

  const url =
    Platform.OS === 'ios'
      ? 'http://localhost:3000/houses'
      : 'http://10.0.2.2:3000/houses';

  const saveProduct = () => {
    if (name.trim() === '') {
      alert('O nome não pode estar vazio');
    } else {
      Axios.post(url, {
        name,
        description,
        metragem,
        price,
        rooms,
        parking,
        img,
      })
        .then(res => {
          alert('Salvo com sucesso!');
          navigation.navigate('Home', {res});
        })
        .catch(() => alert('Erro ao salvar'));
    }
  };

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={openImagePicker} style={style.containerImg}>
        <RenderImg></RenderImg>
        <Text>{img ? 'Alterar Imagem' : 'Carregar imagem'}</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Digite um título"
        style={style.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Digite a metragem (m²)"
        keyboardType="numeric"
        style={style.input}
        value={metragem}
        onChangeText={setMetragem}
      />

      <TextInput
        placeholder="Digite o valor do imóvel "
        keyboardType="numeric"
        style={style.input}
        value={price}
        onChangeText={setPrice}
      />

      <TextInput
        placeholder="Digite a quantidade de cômodos"
        keyboardType="numeric"
        style={style.input}
        value={rooms}
        onChangeText={setRooms}
      />

      <TextInput
        placeholder="Vagas de garagem"
        keyboardType="numeric"
        style={style.input}
        value={parking}
        onChangeText={setParking}
      />
      <TextInput
        placeholder="Descrição do imovel"
        multiline={true}
        numberOfLines={4}
        style={style.inputMultiline}
        value={description}
        onChangeText={setDescription}
      />

      <Button color="#0B1D51" title="Cadastrar" onPress={saveProduct} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 10,
  },
  containerImg: {
    padding: 5,
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
  input: {
    paddingHorizontal: 5,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    height: 50,
  },

  inputMultiline: {
    paddingHorizontal: 5,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    height: 100,
    textAlignVertical: 'top',
  },
  img: {
    width: '100%',
    height: 100,
    borderRadius: 5,
    borderColor: '#CCC',
    borderWidth: 1,
    resizeMode: 'cover',
  },

  icon: {
    fontSize: 70,
    color: '#CCC',
  },
});

export default Cadastro;
