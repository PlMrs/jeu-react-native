import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { createContext, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { PlayerContext, TeamContext, TimerContext } from './context/Context';
import Rapidity from './pages/games/Rapidity';
import GameDashboard from './pages/GameDashboard';
import NewParty from './pages/NewParty';
import Header from './components/Header';
import { Team } from './models/Team';
import Timeout from './pages/games/Timeout';
import DoubleGain from './pages/games/DoubleGain';

const Stack = createNativeStackNavigator();

function HomeScreen({navigation} : any){
  return(
    <View style={styles.container}>
        <View style={styles.container}>
          <Button title="Nouvelle partie" onPress={() => { navigation.navigate('NouvellePartie') }}></Button>
        </View>
      <StatusBar style="auto" />
    </View>
  )
}

export default function App() {

  const [team, setTeam] = useState<Team[]>([])
  const [timer, setTimer]  = useState(0)
  const [player, setNext] = useState(0)

  const [interval, setIntrvl] = useState<any>(null)


  const time = ()=>{
   setIntrvl(setInterval(()=>{
      setTimer((previous) => previous + 1)
    }, 1000))
  }

  const clearIntrvl = ()=>{
    clearInterval(interval)
  }

  return (
    <NavigationContainer>
        <TeamContext.Provider value={{team,setTeam}} >
          <TimerContext.Provider value={{timer,setTimer,startTimer: time,interval,clearIntrvl}} >
            <PlayerContext.Provider value={{player,setNext}} >
            <Header />
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown:false}}>
              <Stack.Screen name="Home" component={HomeScreen}  />
              <Stack.Screen name="NouvellePartie" component={NewParty}  />
              <Stack.Screen name="GameDashboard" component={GameDashboard} />
              <Stack.Screen name="Game" component={Rapidity} />
              <Stack.Screen name="Timeout" component={Timeout} />
              <Stack.Screen name="DoubleGain" component={DoubleGain} />
            </Stack.Navigator>
            </PlayerContext.Provider>
          </TimerContext.Provider>
        </TeamContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
