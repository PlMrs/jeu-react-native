import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ListTeam from "../components/ListTeam";
import { TeamContext, TimerContext } from "../context/Context";

export default function GameDashboard(){

    const navigation = useNavigation();

    const {team,setTeam} = useContext<{team: Team,setTeam: any}>(TeamContext);

    const {timer,startTimer,interval} = useContext(TimerContext)

    const [disabled, setDisabled] = useState(true)

    useEffect(()=>{

        interval ? null : startTimer();

        if(team.filter(tm => tm.points >= 200)){
            console.log('ici')
            setDisabled(!disabled)
        }
    },[])

    useEffect(()=>{
        if(team.filter(tm => tm.points >= 200)){
            console.log('ici')
            setDisabled(!disabled)
        }
    },[team])

    useEffect(()=>{
        if(timer === 3000){
            //clearIntrvl()
            setDisabled(!disabled)
        }
    },[timer])

    const getTime =()=>{
        const minutes = Math.floor(timer / 60)
        const secondes = timer - minutes * 60

        return `${minutes} : ${secondes}`
    }

    return(
        <View style={styles.container}>
            <View style={styles.timerContainer}>
                <Text style={styles.time}>{getTime()}</Text>
            </View>
            <ListTeam type={"gameDashboard"} />
            <View style={styles.questions}>
                <View style={[styles.buttonContainer]}>
                    <TouchableOpacity style={[styles.button]} onPress={()=>{ navigation.navigate('Game'); }}><Text>A</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button]} onPress={()=>{ navigation.navigate('Timeout'); }}><Text>B</Text></TouchableOpacity>
                </View >
                <View style={[styles.buttonContainer]}>
                    <TouchableOpacity style={[styles.button]} onPress={()=>{ navigation.navigate('DoubleGain'); }}><Text>C</Text></TouchableOpacity>
                    <TouchableOpacity disabled={disabled} style={[styles.button,disabled ? {backgroundColor: 'grey'}: null]} onPress={()=>{  }}><Text>D</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center"
    },
    questions: {
        flex:3
    },
    buttonContainer: {
        flexDirection:'row',
        width: "100%",
        justifyContent: "space-evenly",
        marginTop: 50
    },
    button:{
        backgroundColor:"red",
        padding:30,
        width: "20%"
    },
    timerContainer: {
        width: "100%",
        alignItems: 'center',
    },
    time: {
        backgroundColor: "#C1C1C1",
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 100,
        marginTop: 20
    }
})