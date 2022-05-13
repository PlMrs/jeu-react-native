import { useState } from "react";
import { Button, Image, Modal, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ListTeam from "./ListTeam";

export default function Header(){
    const [modalVisible, setModalVisible] = useState(false);
    return(
        <View style={styles.container}>
            <TouchableOpacity  onPress={() => setModalVisible(!modalVisible)}>
                <Image style={styles.modalImage} source={require('../assets/menu.png')} />
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalImageContainer}>
                        <TouchableOpacity  onPress={() => setModalVisible(!modalVisible)}>
                            <Image style={styles.modalImage} source={require('../assets/close.png')} />
                        </TouchableOpacity>
                    </View>
                    <ListTeam type={"gameDashboard"} />
                    <View style={styles.buttonContainer}>
                        <Pressable  title="Relancer" >
                            <Text>Relancer</Text>
                        </Pressable>
                        <Pressable  title="Terminer" >
                            <Text>Terminer</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: "white",
        paddingTop: StatusBar.currentHeight + 10
    },
    modalContainer:{
        width: "70%",
        height:"100%",
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    modalImage:{
        width:40,
        height: 40,
        marginRight: 20    
    },
    modalImageContainer:{
        alignItems: 'flex-end'
    },
    buttonContainer: {
        flex:3,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
})