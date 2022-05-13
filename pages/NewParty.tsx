import { createContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import AddTeam from "../components/AddTeam";
import ListTeam from "../components/ListTeam";


export default function NewParty(){
    const [number, onChangeNumber] = useState(null);
  
    return(
        <View style={styles.container}>
            <AddTeam />
            <ListTeam type={"addTeam"} />
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center"
    }
})