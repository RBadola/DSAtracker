import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react'
import { DataStructure } from './Context'
import { useIsFocused } from '@react-navigation/native';
const TopicCard = ({ heading,  nav, data, img,by }) => {
    const isFocus = useIsFocused()
    const [status,setTopicstatus] = useState("")
    const {storeData} = useContext(DataStructure)
	const getData = async () => {
        try {
            const value = await AsyncStorage.getItem(by+heading)
			if(value){
                let v= value.replace(" ",",") 
                let[b,t] = v.split(",")
                if(b == by && t == heading){
                    setTopicstatus("Started")
                }
                console.log(value);
			}else{
				setTopicstatus("Not Yet Started")
			}
        } catch (e) {
            console.log(e);
        }
    };
	
    const clearData = async() =>await AsyncStorage.clear();

	useEffect(()=>{		
        if(isFocus){
            getData()
        }
	 },[isFocus])
    return (

        <View style={styles.profileCard}>
            <View ><Image source={img} style={styles.profilePicture} /></View>
            <View style={styles.details}>
                <Text style={styles.title}>{heading}</Text>
                <View style={styles.question}>
                    <Text>Total Questions : </Text><Text style={{ fontWeight: '600', fontSize: 18, textAlign: 'center', color: "orange" }}>{data.length}</Text>
                </View>
                <Text style={{ color: "green", marginVertical: 3 }}>{data.length} more to go </Text>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", fontSize: 12 }}>
                        <Text style={[styles.badge,{color:status === "Not Yet Started" ?"red":"#00FFC5",backgroundColor:status === "Not Yet Started" ?"#ff9999":"green"},]} >{status}</Text>
                        <Text style={{ color: "red" }} >10%</Text>
                    </View>
                    <View style={styles.progressBar}><View style={styles.progress}></View></View>
                </View>
                <Pressable onPress={() => {

                    nav.navigate('DSA', {
                        Data: data,
                        name: heading,
                        bg: "Green",
                    });
                }}
                    style={styles.button}
                >
                    <Icon name="arrow-right" size={20} color="black" />
                </Pressable>


            </View>
        </View>

    )
}

export default TopicCard
const styles = StyleSheet.create({
    profileCard: {
        borderWidth: 2,
        paddingTop: 13,
        width: "80%",
        height: 210,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "center",
        margin: 3,
        flex: 1
    },
    profilePicture: {
        margin: 4,
        alignSelf: "flex-start",
        width: 70,
        height: 70
    },
    details: {
        width: "60%"
    },
    title: {
        fontSize: 25,
        fontWeight: "bold"
    },
    question: {
        flexDirection: "row",
        fontWeight: "bold",
        alignItems: "center"
    },
    badge: {
        width: "60%",
        backgroundColor: "#ff9999",
        borderRadius: 11,
        padding: 1,
        textAlign: "center"
    },
    progressBar: {
        width: "100%",
        height: 10,
        backgroundColor: "#ff9999",
        marginVertical: 2,
        borderRadius: 12
    },
    progress: {
        width: "10%",
        height: 10,
        backgroundColor: "red",
        borderRadius: 12,

    },
    button: {
        alignItems: "center",
        justifyContent:"center",
        paddingVertical: 2,
        borderWidth: 2,
        width: 60,
        height:40,
        alignSelf: "flex-end",
        borderRadius: 6
    }

})