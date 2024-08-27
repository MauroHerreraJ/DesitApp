import { Text, View, StyleSheet, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

function User() {
  const [licencia, setLicencia] = useState(null);

  // Función para recuperar la licencia almacenada
  const loadLicencia = async () => {
    try {
      const storedLicencia = await AsyncStorage.getItem('@licencias');
      if (storedLicencia) {
        setLicencia(JSON.parse(storedLicencia));
        console.log(storedLicencia)
      }
    } catch (error) {
      console.log("Error al cargar la licencia", error);
    }
  };

  // Ejecuta la función cuando se monta el componente
  useEffect(() => {
    loadLicencia();
  }, []);

  // Verifica si hay datos de licencia para mostrar
  if (!licencia) {
    return (
      <>
        <View style={styles.withoutLicenseContainer}>

          <View >
            <Text style={styles.withoutLicense}>No posee Licencia...</Text>
          </View>
          <View style={styles.withoutLicenseImage}>
            <Image source={require("../assets/logonuevo.png")}
              style={{ width: 59, height: 59 }} />
          </View>
          <View>
            <Text style={styles.textImage}>Producto desarrollado por Desit SA</Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <View style={styles.dataContainer}>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Usuario: </Text>
            <Text style={styles.textData}>{licencia.storageNombre}</Text>
            <View style={styles.underline}></View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Documento: </Text>
            <Text style={styles.textData}>{licencia.storageDocumento}</Text>
            <View style={styles.underline}></View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Código de Alta: </Text>
            <Text style={styles.textData}>{licencia.storagelicencia}</Text>
            <View style={styles.underline}></View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Licencia: </Text>
            <Text style={styles.textData}>{licencia.storagecodmovil}</Text>
            <View style={styles.underline}></View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Central: </Text>
            <Text style={styles.textData}>{licencia.storageCentral}</Text>
            <View style={styles.underline}></View>
          </View>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image source={require("../assets/logonuevo.png")}
          style={{ width: 59, height: 59 }} />
      </View>

      <View>
        <Text style={styles.textImage}>Producto desarrollado por Desit SA</Text>
      </View>
    </>
  );
}

export default User;

const styles = StyleSheet.create({
  dataContainer: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  textContainer: {
    marginTop: 3,
    marginBottom: 15,
    fontSize: 36,
  },
  text: {
    fontSize: 16,
    fontFamily: "open-sans-bold",
  },
  textData: {
    fontSize: 18,
    fontFamily: "open-sans",
  },
  underline: {
    height: 1,
    backgroundColor: 'grey',
    width: '100%',
    marginTop: 1,
    opacity: 0.55
  },
  textImage: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 15
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  withoutLicense: {
    marginTop:150,
    fontFamily: "open-sans",
    fontSize: 19
  },
  withoutLicenseImage: {
    marginTop: 480
  },
  withoutLicenseContainer:{
    alignItems:"center"
  }


});