import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Axios from 'axios';

const Home = ({navigation, route}) => {
  const [houses, setHouses] = useState([]);
  const url =
    Platform.OS === 'ios'
      ? 'http://localhost:3000/houses'
      : 'http://10.0.2.2:3000/houses';

  useEffect(() => {
    Axios.get(url)
      .then(res => {
        setHouses(res.data);
      })
      .catch(erro => alert('Erro ao requisitar produtos: ' + erro));
  }, [route.params?.res]);

  return (
    <View>
      <FlatList
        style={styles.flatlistView}
        keyExtractor={item => item.id.toString()}
        data={houses}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Editar', {house: item})}
            style={styles.card}>
            <Image
              source={{uri: item.img ? item.img : null}}
              style={styles.img}
            />

            <View style={styles.header}>
              <Text style={styles.headerText}>{item.name}</Text>
              <Text style={styles.headerText}>{item.description}</Text>
            </View>

            <View style={styles.priceView}>
              <Text style={styles.headerText}>R$ {item.price}</Text>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>{item.metragem} m²</Text>
              <Text style={styles.footerText}>{item.rooms} quartos</Text>
              <Text style={styles.footerText}>{item.parking} vagas</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistView: {
    padding: 10,
    marginBottom: 5,
  },

  card: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    marginBottom: 10,
  },

  header: {
    margin: 17,
  },

  headerText: {
    marginBottom: 5,
    fontWeight: '500',
    color: 'black',
  },

  priceView: {
    marginTop: 20,
    marginHorizontal: 10,
  },

  footer: {
    padding: 10,
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  footerText: {
    fontSize: 13,
    color: 'black',
  },

  img: {
    resizeMode: 'cover',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 200,
    width: '100%',
  },
});

export default Home;
