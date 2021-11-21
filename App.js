import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons' 

export default function App(){
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [hasPermission, setHasPermission] = useState(null);
  const camRef = useRef(null);
  const [capturedPicture, setCapturedPicture] = useState(null);

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
      await sendPicture(capturedPicture);
      console.log('finalizou o metodo')
    }
  }

  async function sendPicture(picture){
    console.log(picture)
    const pictureF = await picture.replace("file:///", "file://")
    console.log(pictureF);
    var image = new FormData();
    var imgData = {
      uri: picture,
      type: 'image/jpg',
      name: 'imageData'
    }
    image.append('imgData', imgData);   
    console.log(image);
    await fetch('http://192.168.0.11:5000/post', {
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
    }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });

  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera 
        style={styles.camera}
        type={type}
        ref={camRef}
      >
        <View style={styles.flipButtonV}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={ flipCamera }
          >
            <Text style={styles.flipButtonT}> Flip Camera </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={styles.takePictureV}>
      <TouchableOpacity style={styles.takePicture}>
        <FontAwesome name="camera" size={23} color="#FFF" onPress={ takePicture }/>      
      </TouchableOpacity>
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
  flipButtonV:{
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  flipButton:{
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  flipButtonT:{
    fontSize: 20,
    marginBottom: 13,
    color: '#FFF',
    borderWidth: 1,
    backgroundColor: 'black'
  },
  takePicture:{
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    margin: 20,
    borderRadius: 10,
  },
  takePictureV:{
    justifyContent: 'center',
    alignItems: 'center'
  }

})


