import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button, Overlay } from 'react-native-elements'
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

function SnapScreen(props) {
    const [hasPermission, setHasPermission] = useState(false);
    const isFocused = useIsFocused();
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const [isVisible, setIsVisible] = useState(false)

    var cameraRef = useRef(null)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    var snapClick = () => {
        async function snap() {
            setIsVisible(true);
            if (cameraRef) {
                let photo = await cameraRef.takePictureAsync({
                    quality: 0.7,
                    base64: true,
                    exif: true
                });

                var data = new FormData();
                data.append('avatar', {
                    uri: photo.uri,
                    type: 'image/jpeg',
                    name: 'user_avatar.jpg',
                });

                let pictureReceived = await fetch("http://192.168.1.43:3000/upload", {
                    method: 'post',
                    body: data
                });

                let response = await pictureReceived.json()

                console.log(response.resultDetection)

                let photoInfos = {
                    url: response.url,
                    age: response.resultDetection.detectedFaces[0].age,
                    gender: response.resultDetection.detectedFaces[0].gender
                }
                props.onAddPhoto(photoInfos)
                if (response.result === true) {
                    setIsVisible(false);
                }

            }

        }
        snap()
    };

    if (hasPermission && isFocused) {
        return (
            <View style={{ flex: 1 }}>
                <Overlay
                    width="5000"
                    isVisible={isVisible}
                    onBackdropPress={() => { setIsVisible(false) }}
                >
                    <Text>Loading...</Text>

                </Overlay>
                <Camera style={{ flex: 1, width: "130%" }} flashMode={flash} type={type} ref={ref => (cameraRef = ref)} >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <View style={styles.iconsTouch}>
                                <Ionicons
                                    name="md-camera-reverse-sharp"
                                    size={40}
                                    color="white"
                                />
                                <Text style={styles.text}> Flip </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setFlash(
                                    flash === Camera.Constants.FlashMode.off
                                        ? Camera.Constants.FlashMode.torch
                                        : Camera.Constants.FlashMode.off
                                );
                            }}>
                            <View style={styles.iconsTouch}>
                                <FontAwesome
                                    name="flash"
                                    size={40}
                                    color="white"
                                />
                                <Text style={styles.text}> Flash </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Camera>
                <Button
                    icon={
                        <Icon
                            name="floppy-o"
                            size={15}
                            color="white"
                        />
                    }
                    iconLeft
                    title="Snap"
                    buttonStyle={{ backgroundColor: "#009788" }}
                    type="solid"
                    onPress={() => snapClick()

                    }

                />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Text>Autorisation non donnée</Text>
            </View>

        )
    }


};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        marginHorizontal: 10,
        alignSelf: 'flex-end',
        alignItems: 'center',



    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    iconsTouch: {
        alignItems: "center",
    }
});

function mapDispatchToProps(dispatch) {
    return {
        onAddPhoto: function (photoInfos) {
            dispatch({ type: 'addPhoto', photoInfos: photoInfos })
        }
    }
}

export default connect(null, mapDispatchToProps)(SnapScreen);