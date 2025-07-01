import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titulo: {
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 30
    },
    input: {
      backgroundColor: '#d1d1d1',
      height: 40,
      width: "80%",
      borderRadius: 10,
      marginTop: 20,
      fontSize: 15
    },
    botao: {
      backgroundColor: "#0782F9",
      width: "50%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 20
    },
    botaoText: {
      color: "white",
      fontSize: 15,
      fontWeight: 500
    },
    botaoSec: {
      backgroundColor: "white",
      width: "50%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      borderColor: "#0782F9",
      borderWidth: 2,
      marginTop: 20
    },
    botaoSecText: {
      color: "#0782F9",
      fontSize: 15,
      fontWeight: 500
    }
  
  });