import { React, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements'



export default function HomeScreen(props) {

    const [pseudo, setPseudo] = useState('');

    return (
        <ImageBackground style={styles.container} source={require("../assets/home.jpg")}>
            <View style={styles.view}>
                <Input
                    placeholder="John"
                    onChangeText={(value) => setPseudo(value)}
                    leftIcon={{ type: 'font-awesome', name: 'user', color: "#009788" }}
                    value={pseudo}
                />
                <Button
                    title="Go to gallery"
                    onPress={() => {
                        // setPseudoIsSubmited(true);
                        // props.onSetPseudo(pseudo);
                        props.navigation.navigate('TabNav', { screen: "Gallery" });
                        // AsyncStorage.setItem("Pseudo", pseudo)                      
                    }}
                    buttonStyle={{ backgroundColor: "#009788" }}

                />
            </View>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    view: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center"

    },


});