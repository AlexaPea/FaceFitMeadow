import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";

const PlayScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = React.useState(null);
  const [faceData, setFaceData] = React.useState();

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to the camera</Text>;
  }

  const getFaceDataView = () => {
    if (faceData?.length === 0) {
      return (
        <View style={styles.faces}>
          <Text style={styles.faceDescriptions}>No face detected</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.faces}>
          {faceData?.map((face, index) => {
            const smilingScore = face.smilingProbability > 0.7;
            return (
              <Text key={index} style={styles.faceDescriptions}>
                Smiling: {smilingScore ? "🟢" : "🔴"}
              </Text>
            );
          })}
        </View>
      );
    }
  };

  const handleFacesDetected = ({ faces }) => {
    setFaceData(faces);
  };

  return (
    <Camera
      style={styles.camera}
      type={Camera.Constants.Type.front}
      ratio="16:9"
      onFacesDetected={(faceData) => handleFacesDetected(faceData)}
      faceDetectorSettings={{
        mode: FaceDetector.FaceDetectorMode.accurate,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
        runClassifications: FaceDetector.FaceDetectorClassifications.all,
        minDetectionInterval: 100,
        tracking: true,
      }}
    >
      {getFaceDataView(faceData)}
    </Camera>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  faces: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  faceDescriptions: {
    color: "#000",
    fontSize: 20,
    textAlign: "center",
  },
});

export default PlayScreen;
