import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedbackBase, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { PlayerContext, TeamContext } from "../../context/Context";
import { Team } from "../../models/Team";
import {buzz} from '../../static/questions.json';

export default function Timeout(){

const navigation = useNavigation();

const {team,setTeam} = useContext<{team: Team,setTeam: any}>(TeamContext);

const {player, setNext} = useContext(PlayerContext);

const [winner, setWinner] = useState<string>("")

const [timer, setTimer]  = useState(20)

const [interval, setIntrvl] = useState<any>(null)

const [question, setQuestion] = useState({
    title : "",
    question : "",
    answer: ""
})
const [showAnswer, onChangeAnswer] = useState(false)

const [number, onChangeNumber] = useState("")

const time = ()=>{
    setIntrvl(setInterval(()=>{
       setTimer((previous) => previous - 1)
     }, 1000))
   }
 
const clearIntrvl = ()=>{
    clearInterval(interval)
}

useEffect(()=>{
    const index = Math.floor(Math.random() * buzz.length)
    setQuestion(buzz[index])
    time()
},[])
useEffect(()=>{
    if(timer < 1){
        clearIntrvl()
    }
},[timer])

const getTime =()=>{
    const minutes = Math.floor(timer / 60)
    const secondes = timer - minutes * 60

    return `${minutes} : ${secondes}`
}
const validWinner = ()=>{
    const updatedTeam = team.map(tm =>{
        if(tm.nom === winner){
            tm.points = tm.points + Number(number) 
        }
        return tm
    })
    setTeam(updatedTeam)
    team[player + 1] === undefined ? setNext(0) : setNext(player + 1)
    return navigation.navigate('GameDashboard')
}


    return(
        <View style={styles.container}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{question.title}</Text>
                    <Text style={styles.time}>{getTime()}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text>{question.question}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Pressable onPress={()=>{ onChangeAnswer(!showAnswer) }} style={showAnswer ? {display:'none'} : styles.answerButton}>
                        <Text style={styles.showAnswerButton}>?</Text>
                    </Pressable>
                    <Text style={showAnswer ? {display:'flex'} : {display:'none'}}>{question.answer}</Text>
                </View>
            </View>
            <View style={styles.reponseContainer}>
                <Text>Qui à gagné?</Text>
                <Text>{winner}</Text>
                <Text>{number}</Text>
                <View style={styles.selector}>
                    <RNPickerSelect 
                        onValueChange={(value) => setWinner(value) }
                        items={team.map((e : any)=>{
                            return {
                                label: e.nom,
                                value: e.nom
                            }
                            })}
                    />
                    </View>
                <Text>Combien de points ?</Text>
                <TextInput 
                    style={{backgroundColor:'white', width: '100%'}}
                    keyboardType='numeric'
                    onChangeText={(text)=> onChangeNumber(text)}
                    value={number}
                    maxLength={10}  //setting limit of input
                />
                <Pressable style={styles.submit} onPress={()=> validWinner()}>
                    <Text style={{color:'white'}}>Valider</Text>
                </Pressable>
            </View>
        </View>

    )
}

export const styles = StyleSheet.create({
    container:{
        flex:2
    },
    reponseContainer:{
        flex:1,
        alignItems: 'center'
    },
    textContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize: 30,
        fontWeight: '800'
    },
    question: {
        flex:1
    },
    answer: {
        flex:1
    },
    answerButton:{
        alignItems:'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: "grey",
        borderRadius: 100/2
    },
    showAnswerButton: {
        color: "white",
        fontWeight: '800'
    },
    selector:{
        backgroundColor:'white',
        width: '100%'
    },
    submit:{
        backgroundColor: '#007EB9',
        width: '30%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20,
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