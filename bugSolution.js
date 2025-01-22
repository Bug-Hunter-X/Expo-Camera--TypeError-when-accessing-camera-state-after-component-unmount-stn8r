```javascript
import React, { useRef, useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';

const CameraComponent = () => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    return () => setIsMounted(false);
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && isMounted) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log('Photo taken:', photo);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  if (hasPermission === null) {
    return <View />; // loading
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity onPress={() => { setType(type === CameraType.back ? CameraType.front : CameraType.back) }} style={{ flex: 0.1, backgroundColor: 'transparent' }}>
            <Text style={{ fontSize: 18, color: 'white' }}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture} style={{ flex: 0.1, backgroundColor: 'transparent' }}>
            <Text style={{ fontSize: 18, color: 'white' }}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraComponent; 
```