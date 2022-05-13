import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { TeamContext } from "../context/Context";

export default function AddTeam(){

    const {team,setTeam} = useContext(TeamContext);

    const navigation = useNavigation();

    const [text, onChangeText] = useState("");

    const addTeam = (text)=>{
        const isSet = team.find(e => e.nom === text)
        if(!isSet){
            onChangeText("")
            return setTeam([...team, {nom: text,points: 0}])
        }

        alert("Nom d'équipe déja prit")
    }

    const checkTeam = ()=>{
        team.length > 1 ? navigation.navigate('GameDashboard'): alert('Veuillez créer au moins deux équipes')
    }


    return(
        <View style={styles.container}>
            <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder="Nom de votre équipe"/>
            <View style={styles.buttonContainer}>
                <Button style={styles.button} title="Ajouter" onPress={()=>{ addTeam(text)}}/>
                <Button style={styles.button} title="Terminer" onPress={()=>{ checkTeam() }} />
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#B0B0B0"
    },
    input: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        marginBottom: 20
    },
    buttonContainer:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    button: {
        width:"40%",
    }
})
