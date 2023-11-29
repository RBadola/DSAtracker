import React, { useContext, useEffect ,useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList, Pressable, StyleSheet, Text, Vibration, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataStructure } from './Context'
import { useIsFocused } from '@react-navigation/native';
const Row = ({ item }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const {storeData} = useContext(DataStructure)
    const isFocus = useIsFocused()
    const ONE_SECOND_IN_MS = 10;
    const ToggleFunction =async () => {
        
        Vibration.vibrate(1 * ONE_SECOND_IN_MS)
        try {
            if(!toggleCheckBox){ 
                setToggleCheckBox(true)
                const jsonValue = JSON.stringify(true);
                await AsyncStorage.setItem(item.Problem,jsonValue)
                const setBY = item.By+item.Topic
                const SetByValue = item.By+" "+item.Topic
                await AsyncStorage.setItem(setBY,SetByValue)

            }else{
                setToggleCheckBox(false)
                const jsonValue = JSON.stringify(false);
                await AsyncStorage.setItem(item.Problem,jsonValue)
            }
          } catch (e) {
            console.log(e);
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
      useEffect(()=>{	
		if(isFocus){
			getData()
		}	
	 },[isFocus])
    return (
        <View style={styles.row}>
            <Text style={styles.col1}>{item.Problem }</Text>
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
        fontSize: 18,
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