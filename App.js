import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, Modal, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons'
import axios from 'axios'
import Alfabeto from './assets/alfabeto.png'
import Mao from './assets/mao.jpg'
import Switch from './assets/switch.png'
import Texto from './assets/retornotexto.png'
import TirarFoto from './assets/tirarfoto.png'
import 'whatwg-fetch'

export default function App(){
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [hasPermission, setHasPermission] = useState(null);
  const camRef = useRef(null);
  // capturedPicture
  const [capturedPicture, setCapturedPicture] = useState(null);
  const [response, setResponse] = useState(null)

  const [infoModal, setInfoModal] = useState(null);
  const [openInfo, setOpenInfo] = useState(null);

  const letras = [
    ['A',['polegar esticado vertical: afastado do indicador', 'indicador dobrado: proximo ao medio', 'medio dobrado: proximo ao anelar', 'anelar dobrado: proximo ao minimo', 'minimo dobrado: proximo ao anelar']],
    ['B',['polegar dobrado: afastado do indicador', 'indicador esticado vertical: proximo ao medio', 'medio esticado vertical: proximo ao anelar', 'anelar esticado vertical: proximo ao minimo', 'minimo esticado vertical: proximo ao anelar']],
    ['C',['polegar esticado horizontal: afastado do indicador', 'indicador esticado vertical: proximo ao medio', 'medio esticado vertical: proximo ao anelar', 'anelar esticado vertical: proximo ao minimo', 'minimo esticado vertical: proximo ao anelar']],
    ['D',['polegar esticado horizontal: afastado do indicador', 'indicador esticado vertical: afastado do medio', 'medio dobrado: proximo ao anelar', 'anelar dobrado: proximo ao minimo', 'minimo dobrado: proximo ao anelar']],
    ['E',['polegar dobrado: afastado do indicador', 'indicador dobrado: proximo ao medio', 'medio dobrado: proximo ao anelar', 'anelar dobrado: proximo ao minimo', 'minimo dobrado: proximo ao anelar']],
    ['F',['polegar esticado vertical: proximo ao indicador', 'indicador esticado vertical: proximo ao medio', 'medio esticado vertical: afastado do anelar', 'anelar dobrado: proximo ao minimo', 'minimo dobrado: proximo ao anelar']],
    ['G',['polegar esticado vertical: proximo ao indicador', 'indicador esticado vertical: afastado do medio', 'medio dobrado: proximo ao anelar', 'anelar dobrado: proximo ao minimo', 'minimo dobrado: proximo ao anelar']],
    ['I',['polegar dobrado: proximo ao indicador', 'indicador dobrado: proximo ao medio', 'medio dobrado: proximo ao anelar', 'anelar dobrado: afastado do minimo', 'minimo esticado vertical: afastado do anelar']],
    ['L',['polegar esticado vertical: afastado do indicador', 'indicador esticado vertical: afastado do medio', 'medio dobrado: proximo ao anelar', 'anelar dobrado: proximo ao minimo', 'minimo dobrado: proximo ao anelar']],
    ['M',['polegar esticado vertical: proximo ao indicador', 'indicador esticado vertical: proximo ao medio', 'medio esticado vertical: proximo ao anelar', 'anelar esticado vertical: proximo ao minimo', 'minimo esticado vertical: proximo ao anelar']],
    ['N',['polegar esticado horizontal: afastado do indicador', 'indicador esticado vertical: proximo ao medio', 'medio esticado vertical: afastado do anelar', 'anelar dobrado: proximo ao minimo', 'minimo dobrado: proximo ao anelar']],
    ['O',['polegar esticado horizontal: afastado do indicador', 'indicador dobrado: proximo ao medio', 'medio dobrado: proximo ao anelar', 'anelar dobrado: proximo ao minimo', 'minimo dobrado: proximo ao anelar']],
    ['P',['polegar esticado vertical: afastado do indicador', 'indicador esticado vertical: afastado do medio', 'medio esticado vertical: afastado do anelar', 'anelar dobrado: proximo ao minimo', 'minimo dobrado: proximo ao anelar']],
    ['Q',['polegar esticado vertical: afastado do indicador', 'indicador esticado vertical: afastado do medio', 'medio dobrado: proximo ao anelar', 'anelar dobrado: afastado do minimo', 'minimo esticado vertical: afastado do anelar']],
    ['R',['polegar dobrado: afastado do indicador', 'indicador esticado vertical: proximo ao medio', 'medio esticado vertical: afastado do anelar', 'anelar dobrado: proximo ao minimo', 'minimo dobrado: proximo ao anelar']],
    ['S',['polegar dobrado: proximo ao indicador', 'indicador dobrado: proximo ao medio', 'medio dobrado: proximo ao anelar', 'anelar dobrado: proximo ao minimo', 'minimo dobrado: proximo ao anelar']],
    ['T',['polegar esticado horizontal: afastado do indicador', 'indicador dobrado: afastado do medio', 'medio esticado vertical: proximo ao anelar', 'anelar esticado vertical: proximo ao minimo', 'minimo esticado vertical: proximo ao anelar']],
    ['U',['polegar esticado horizontal: afastado do indicador', 'indicador esticado vertical: proximo ao medio', 'medio esticado vertical: afastado do anelar', 'anelar dobrado: proximo ao minimo', 'minimo dobrado: proximo ao anelar']],
    ['V',['polegar esticado horizontal: afastado do indicador', 'indicador esticado vertical: afastado do medio', 'medio esticado vertical: afastado do anelar', 'anelar dobrado: proximo ao minimo', 'minimo dobrado: proximo ao anelar']],
    ['W',['polegar esticado horizontal: afastado do indicador', 'indicador esticado vertical: afastado do medio', 'medio esticado vertical: proximo ao anelar', 'anelar esticado vertical: afastado do minimo', 'minimo dobrado: afastado do anelar']],
  ]
  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  if(hasPermission === null){
    return <View/>
  }
  if(hasPermission === false){
    return <Text>Acesso Negado! </Text>
  }

  function flipCamera(){
    setType( 
      type === Camera.Constants.Type.front
      ? Camera.Constants.Type.back
      : Camera.Constants.Type.front)
  }


  async function takePictureMD(){
    if(camRef){
      var data = await camRef.current.takePictureAsync();
      await sendPictureMD(data.uri)
    }
  }

  async function takePictureMP(){
    if(camRef){
      // console.log(capturedPicture);
      // teste do post
      var data = await camRef.current.takePictureAsync()
      await sendPictureMP(data.uri);
      setCapturedPicture(data.uri);
    }
  }
  async function openInfoModal() {
    setInfoModal(true);
    setOpenInfo(true);
    console.log("*info modal*");
  }

  function deleteText(){
    setResponse(null);
  }
  
  async function sendPictureMD(picture){
    // str.replace(/xmas/i, 'Christmas')
    
    console.log(picture)
    console.log('--')
    var image = new FormData();
    var imgData = {
      uri: picture,
      type: 'image/jpg',
      name: 'imageData'
    }
    image.append('imgData', imgData);   
    fetch('192.168.0.13:5000/hw', {method:'GET'})
    // fetch('http://192.168.0.13:5000/modulos/descricao', 
    // {
    // timeout: 50000,
    // method: 'POST',
    // headers: {
    //   Accept: "multipart/form-data",
    //           "Content-Type": "multipart/form-data",
    //           "Access-Control-Allow-Origin": "*",
    //           "Access-Control-Allow-Methods": "POST",
    //           "Access-Control-Allow-Headers": "Content-Type, Authorization",
    //           "Access-Control-Allow-Credentials": "true",
    //         },
    //         body: image
    //       }
    //     )
    //     .then(response => response.json())
    //     .then(json => {
    //                   console.log(json.data);
    //                   setResponse(json.data)
    //                   })
    //     .catch((error) => {
    //       console.error(error);
    //       setResponse('Erro de comunicação com a API, verifique sua conexão com internet ou aguarde alguns instantes!')
    //     });
  }

  async function sendPictureMP(picture){
    console.log(picture)
    // console.log(pictureF);
    setResponse('Carregando...')
    var image = new FormData();
    var imgData = {
      uri: picture,
      type: 'image/jpg',
      name: 'imageData'
    }
    image.append('imgData', imgData);   
    console.log('Começou o método');

    await fetch('http://192.168.0.13:5000/modulos/descricao', {
      method: 'POST',
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
      body: image
    } )
      .then(response => response.json())
      .then(json => {
                    console.log(json.data);
                    setResponse(json.data)
                    })
      .catch((error) => {
        console.error(error);
        setResponse('Erro de comunicação com a API, verifique sua conexão com internet ou aguarde alguns instantes!')
      });
  }

  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#000"/>

    <SafeAreaView style={styles.container}>
        
      <Camera 
        style={styles.camera}
        type={type}
        ref={camRef}
        >
          <View style={styles.infoBtn}  > 
           <FontAwesome name="info-circle" size={40} onPress={ openInfoModal } color="grey" style={styles.pictureButton}/>     
          </View>
        <View style={styles.suporte}>
        <View style={styles.buttons}>
          <View style={styles.flipButtonV}> 
            <FontAwesome name="undo" size={40} color="#FFF" onPress={ flipCamera } style={styles.flipButton}/> 
          </View>
          <View style={styles.takePictureV}  > 
           <FontAwesome name="camera" size={40} color="#FFF" onPress={ takePictureMP } style={styles.pictureButton}/>     
          </View>
          <View style={styles.removeText}> 
           <FontAwesome name="trash" size={40} color="#FFF" onPress={ deleteText } style={styles.pictureButton}/>     
          </View>         
        </View>
        </View>
      </Camera>
      <View style={styles.outPutV}>
        <Text style={styles.outPut}>{response}</Text>
      </View>
      
      {/* INÍCIO DA MODAL DE INFORMAÇÕES*/}
      { infoModal &&
        <Modal
        animationType="slide"
        transparent={false}
        visible={openInfo}
        >
        <ScrollView style={styles.containerModal}>      
            <View style={styles.cabecalho}>
              <Text style={styles.titulo}>GLOSSÁRIO</Text>
              <Text style={styles.subTitulo}>LETRAS DISPONÍVEIS NO E-LIBRAS</Text>
              <Image source={Alfabeto} style={styles.imagemGlossario}/>             
            </View>

            <View style={styles.cabecalho}>
              <Text style={styles.titulo}>MANUAL DE UTILIZAÇÃO</Text>
              <View>
                <Text style={styles.subTitulo}>IMAGEM</Text>
                <Text style={styles.paragrafo}>Apenas o gesto da sua mão será considerado para o retorno em texto. Atenção: procure um local iluminado de forma que apareça a sua mão nitidamente na câmera.</Text>
                <Image source={Mao} style={styles.imagemMao}/> 
                <Text style={styles.subTitulo}>CAPTURA DE IMAGEM</Text>
                <Text style={styles.paragrafo}>Para capturar a image do gesto, é necessário utilizar o botão de captura.</Text>
                 <Image source={TirarFoto} style={styles.imagemTutorial}/> 
                <Text style={styles.subTitulo}>INVERTER AS CÂMERAS</Text>
                <Text style={styles.paragrafo}>O botão para inverter entre camêras frontal e traseira está localizado na parte inferior da tela.</Text>
                <Image source={Switch} style={styles.imagemTutorial}/> 
                  <Text style={styles.subTitulo}>TEXTO</Text>
                <Text style={styles.paragrafo}>Quando um sinal é captado pela câmera, este será transformado em texto e apresentado na parte inferior da tela.</Text>
                 <Image source={Texto} style={styles.imagemTutorial}/> 
                <Text style={styles.subTitulo}>LIMPAR TEXTO</Text>
                <Text style={styles.paragrafo}>Também é possível limpar o campo de texto pressionando o botão que está localizado na parte inferior da tela.</Text>
                 <Image source={Texto} style={styles.imagemTutorial}/> 
              </View>              
            </View>  
            <View style={styles.cabecalho}>
            <Text style={styles.titulo}>SOBRE NÓS</Text>
            <Text style={styles.paragrafo}>Grupo composto pelos alunos José Favaro, Greici Souza, David Caron e André Myszko da turma do 6° período de Engenharia de Software da Unibrasil</Text>
            </View>
            <View>
                <TouchableOpacity style={{backgroundColor: 'gray', borderRadius: 180, maxWidth:150,  bottom: 10, marginTop: 50 }} onPress={ () => setInfoModal(false)}>
                  <FontAwesome name="chevron-left" size={35} color="#FFF" style={{margin:5, paddingHorizontal:50}} />
                </TouchableOpacity>
              </View>
          </ScrollView>
      </Modal>
      }

    </SafeAreaView>
    </>

  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
  },

  camera:{
    flex: 1,
  },

  suporte:{
    // justifyContent: 'center',
    // alignContent:'flex-end'
    alignSelf: 'auto',
    top: '70%',
    left: 70,
  },

  buttons:{
    position:'absolute',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    flex:2,
    height: 200,
    width: 300,
  },

  flipButtonV:{
    // backgroundColor: 'transparent',
    flexDirection:'row',
    justifyContent: 'flex-start',
    marginLeft: '20%'
  },

  takePictureV:{
    flexDirection:'row',
    justifyContent: 'center',
    marginLeft: '0%',
  },

  removeText:{
    flexDirection:'row',
    justifyContent:'flex-end',
    marginLeft: '50%',
    position: 'absolute'
  },

  infoBtn:{
    flexDirection:'row',
    justifyContent:'flex-end',
    marginTop: '15%',
    marginLeft: '70%',
    position: 'absolute'
  },

  flipButton:{
    position:'absolute'
  },

  pictureButton:{
    flexDirection:'row',
    justifyContent: 'center',
  },

  outPutV:{
    justifyContent:'center',
    alignItems:'center',
    height: 100,
  },

  outPut:{
    fontSize: 20
  },

//Estilos modal de informações 

  containerModal: {
    flex: 1,
    backgroundColor: '#212329'
  }, 

  cabecalho: {
    marginTop: 20,  
    padding: '5%', 
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  titulo: {
    color: '#FFF', 
    fontSize: 25,
    fontWeight: 'bold'
  },

  subTitulo: {
    color: '#FFF', 
    fontSize: 18,
    fontWeight: 'bold'
  },

  paragrafo: {
    color: '#FFF', 
    fontSize: 16,
    width: 340,
    marginTop:5,
    marginBottom: 5
  },

  imagemTutorial:{
    height: 200,
    width: 340,
    marginTop: 10,
    marginBottom: 10,
  },

  imagemMao: {
    height: 450,
    maxWidth: 340,
    marginTop: 10,
    marginBottom: 10
  },
  
  imagemGlossario: {
    maxWidth: '100%',
    height: 450
  }
});


