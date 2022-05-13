import { useContext } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { PlayerContext, TeamContext } from "../context/Context";

export default function ListTeam({type}){

    const {team,setTeam} = useContext(TeamContext);
    const {player, setNext} = useContext(PlayerContext);

    const removeTeam = (item)=>{
        const filtered = team.filter(e => e.nom != item.nom)
        setTeam(filtered)
        
    }
    if(type === "addTeam"){
        return(
            <View style={styles.container}>
                <FlatList
                    data={team}
                    renderItem={({item})=>
                        <View style={styles.element}>
                            <Text style={styles.elementText}>{item.nom}</Text>
                            <Text style={styles.cross} onPress={()=>{ removeTeam(item) }}>X</Text>
                        </View>    
                    }
                />
            </View>
        )
    }
    if(type === "gameDashboard"){
        return(
        <View style={styles.container}>
                <FlatList
                    data={team}
                    renderItem={({item,index})=>
                        <View style={styles.dashBoardElement}>
                            <View style={[styles.element, {width: "50%"},index === player ? {backgroundColor: 'green'} : '']}>
                                <Text style={styles.elementText}>{item.nom}</Text>
                            </View>
                            <View style={[styles.element,{backgroundColor: 'transparent'}]}>
                                <Text>{item.points} points</Text>
                            </View>
                        </View>    
                    }
                />
        </View>
        )
    }

    return(
        <View>
            <Text>Aucun type spécifié</Text>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex:1.5,
        justifyContent: "center",
        padding: 30
    },
    element: {
        backgroundColor: "#00B5C1",
        padding: 10,
        alignItems: "center",
        marginTop: 10,
        position: 'relative'

    },
    dashBoardElement: {
        flexDirection: 'row',
        width: "100%"
    },
    elementText: {
        color: "white"
    },
    cross: {
        position: 'absolute',
        right: 10,
        top: "50%"
    }
})