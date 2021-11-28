import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons'
import axios from 'axios'
export default function App(){
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [hasPermission, setHasPermission] = useState(null);
  const camRef = useRef(null);
  const [capturedPicture, setCapturedPicture] = useState(null);
  const [response, setResponse] = useState(null)
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

  async function takePicture(){
    if(camRef){
      const data = await camRef.current.takePictureAsync();
      setCapturedPicture(data.uri);
      console.log(capturedPicture);
      // teste do post
      await sP(capturedPicture);
    }
  }

  async function sP(picture){
    var image = new FormData();
    var imgData = {
      uri: picture,
      type: 'image/jpg',
      name: 'imageData'
    };
    image.append('imgData', imgData);

    var instance = axios.create({
      baseURL: 'http://192.168.56.255:5000/',
      timeout: 999999,
      headers: {
      Accept: "multipart/form-data",
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",},
      
    });
    // instance.post('/mediapipe', image).then((responseMP) => console.log(responseMP));
    instance.get('/hw').then((responseHW) => console.log(responseHW));
    // axios.post('/mediapipe', image).then((responseA) => 
    //                                       console.log(responseA));
    return 'instance'

    
  }
 
  async function sendPicture(picture){
    // console.log(picture)
    // console.log(pictureF);
    var image = new FormData();
    var imgData = {
      uri: picture,
      type: 'image/jpg',
      name: 'imageData'
    }
    image.append('imgData', imgData);   
    console.log('Começou o método');
    await fetch('192.168.56.101:5000/mediapipe', {
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
      .then((response) => response.json())
      .then((json) => {
        console.log('Response Esperado:"{data:letraAlfabeto}" ')
        console.log(json.data)
        if(json.data != 'Nao foi possível identificar a mao!'){
          console.log(letras.length)
          for(var i = 0; i < letras.length; i++){
            // console.log(letras[i][1]) --> Descricao | letras[i][0] --> Letra
            // console.log(letras[i][1].toString())
            if(letras[i][1].toString() == json.data.toString()){
              console.log('Deu match');
              setResponse('Letra Localizada! --> ' + letras[i][0] );
            }
        }
        }else{
          setResponse(json.data);
        }
      }).catch((error) => {
        console.error(error);
        setResponse('Erro de comunicação com a API, verifique sua conexão com internet ou aguarde alguns instantes!')
      });

  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera 
        style={styles.camera}
        type={type}
        ref={camRef}
        >
        <View style={styles.suporte}>
        <View style={styles.buttons}>
          <View style={styles.flipButtonV}> 
            <FontAwesome name="undo" size={40} color="#FFF" onPress={ flipCamera } style={styles.flipButton}/> 
          </View>
          <View style={styles.takePictureV}> 
           <FontAwesome name="camera" size={40} color="#FFF" onPress={ takePicture } style={styles.pictureButton}/>     
          </View>
        </View>
        </View>
      </Camera>
      <View style={styles.outPutV}>
        <Text style={styles.outPut}>{response}</Text>
      </View>
    </SafeAreaView>

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
  flipButton:{
    position:'absolute',

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
  
})


