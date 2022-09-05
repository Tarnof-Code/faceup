import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card, Badge, ListItem } from 'react-native-elements'
import { connect } from 'react-redux';





function GalleryScreen(props) {


    const [gallery, setGallery] = useState([])

    useEffect(() => {
        function loadGallery() {

            setGallery(props.gallery);
        }
        loadGallery();



    }, [props.gallery]);

    // console.log("C'est la galerie", gallery)

    let galleryUpdated = gallery.map((infos, i) => (
        <Card key={i}>
            <Card.Image style={{ width: "100%", height: 210, marginBottom: 10 }} source={{ uri: infos.url }} />

            <Badge value={infos.gender} status="success" />
            <Badge value={infos.age} status="success" />
            {/* <Badge value="barbe" status="success" />
            <Badge value="joyeux !" status="success" />
            <Badge value="cheveux gris" status="success" /> */}
        </Card>

    ));

    // console.log("Galerie mise à jour", galleryUpdated)

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.titre}>
                <Text h4 style={{ fontSize: 20, fontWeight: "bold" }}>Tarnof's Gallery</Text>
            </View>
            <ScrollView style={{ marginTop: 20 }} >
                {galleryUpdated}
            </ScrollView>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#2980b9',
        alignItems: 'center',
        justifyContent: 'center',
    },

    listItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    titre: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,

    }
});

function mapStateToProps(state) {
    return { gallery: state.gallery }
}
export default connect(mapStateToProps, null)(GalleryScreen);