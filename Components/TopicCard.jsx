import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
const TopicCard = ({ heading, nav,  data, img }) => {
    const isFocus = useIsFocused()
    const [status,setTopicstatus] = useState("Not Yet Started")
    const [attempted,setAttempted] = useState(0)
    const [percent,setPercent]=useState(0)
	const getData = async () => {
        try {
            const value =  await AsyncStorage.getItem(heading+"Attempt")
            let n = Number(value)
            setAttempted(n)
            calpercent(n)
            if(n > 0){
                setTopicstatus("Started")
            }
            if(n===data.length){
                setTopicstatus("Finished")
            }
            if(n===0){
                setTopicstatus("Not Yet Started")
            }
        } catch (e) {
            console.log(e);
        }
    };
	const calpercent =(a)=>{
        const c = Math.round(((a)/data.length)*100) 
        setPercent(c)
    }
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
                <Text style={{ color: "green", marginVertical: 3 }}>{data.length-attempted} more to go </Text>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", fontSize: 12 }}>
                        <Text style={[styles.badge,{color:status === "Not Yet Started" ?"red":"#00FFC5",backgroundColor:status === "Not Yet Started" ?"#ff9999":"green"},]} >{status}</Text>
                        <Text style={{ color: "red" }} >{percent}%</Text>
                    </View>
                    <View style={styles.progressBar}><View style={{width:`${percent}%`,height: 10,backgroundColor:status ==="Finished"? "green":"red",borderRadius: 2,}}></View></View>
                </View>
                <Pressable onPress={() => {

                    nav.navigate('DSA', {
                        Data: data,
                        name: heading,
                        bg: "Green",
                        total:data.length,
                        done:attempted
                    });
                }}
                    style={styles.button}
                >
                    <Icon name="arrowright" size={20} color="black" />
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
        flex: 1,
        
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
        borderRadius: 2
    },
    progress: {
        

    },
    button: {
        alignItems: "center",
        justifyContent:"center",
        paddingVertical: 1,
        borderWidth: 2,
        width: 50,
        height:40,
        alignSelf: "flex-end",
        borderRadius: 6,
        marginTop:2
    }

})