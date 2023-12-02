import React, {  useEffect ,useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import {  Linking, Pressable, StyleSheet, Text, Vibration, View ,} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
const Row = ({ item }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const isFocus = useIsFocused()
    const ONE_SECOND_IN_MS = 10;
    const showToast = () => {
       
      };
    const ToggleFunction =async () => {
        
        Vibration.vibrate(1 * ONE_SECOND_IN_MS)
        try {
            if(!toggleCheckBox){ 
                showToast()
                setToggleCheckBox(true)
                const jsonValue = JSON.stringify(true);
                incAttempt()
                await AsyncStorage.setItem(item.Problem,jsonValue)
            }else{
                setToggleCheckBox(false)
                incAttempt()
                const jsonValue = JSON.stringify(false);
                await AsyncStorage.removeItem(item.Problem)
            }
          } catch (e) {
            console.log(e);
          }
    }
    const incAttempt= async()=>{
        if(!toggleCheckBox){
            const value = await AsyncStorage.getAllKeys()
            if(!value.includes(item.Problem)){
                const v = await AsyncStorage.getItem(item.Topic+"Attempt")
                let i = Number(v)                
                await AsyncStorage.setItem(item.Topic+"Attempt",JSON.stringify(i+1))
            }
        }else{
            const v = await AsyncStorage.getItem(item.Topic+"Attempt")
            let i = Number(v)  
            if(i>0){
                await AsyncStorage.setItem(item.Topic+"Attempt",JSON.stringify(i-1))
            }              
        }
    }
    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem(item.Problem);
          if (value ) {
            setToggleCheckBox(value === "true")
          }
        } catch (e) {
          console.log(e);

        }
      };
      const urlOpener=(u)=>{
        Vibration.vibrate(4 * ONE_SECOND_IN_MS)
        Linking.openURL(u)
      }
      useEffect(()=>{	
		if(isFocus){
			getData()
		}	
	 },[isFocus])
    return (
        <View style={styles.row}>
            <View style={styles.col1}>
            <Text onPress={()=>urlOpener(item.URL2)}  style={{ fontSize: 18,}}>{item.Problem }</Text>
            <Text onPress={()=>urlOpener(item.URL)} style={{ fontSize: 14,color:"#00308F"}}>solution</Text>
          
            </View>
                <Pressable onPress={ToggleFunction}  >
                    <View style={styles.box}>
                        {toggleCheckBox && <Icon name="check" size={15} color="green" />}
                    </View>
                </Pressable>
            <View style={styles.bottom}></View>
        </View>
    )
}

export default Row
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 3,
        width: "90%",
        justifyContent: "space-between",
        flex: 1,
        position:'relative',
    },
    bottom:{
        zIndex:-1,
        position:"absolute",
        width:"110%",
        opacity:0.2,
        backgroundColor:"#F8FF95",
        height:"100%",
    },
    col1: {
       display:"flex",
        width: "100%",
        padding: 4,
        marginVertical:6,
    },
    box: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderRadius: 2,
        marginLeft: 2,
        marginVertical:6,
        justifyContent: "center",
        alignItems: "center",
    },
})