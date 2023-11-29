import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import ProfileCard from './ProfileCard'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react'
import { DataStructure } from './Context'
import { useIsFocused } from '@react-navigation/native';

const Profiles = ({ navigation }) => {
	const [status,setstatus] = useState("")
    const { DATASHRADHA,DATALOVE ,storeData} = useContext(DataStructure)
    const isFocus = useIsFocused()

	const getData = async () => {
        try {
            const value = await AsyncStorage.getAllKeys()
			if(value.includes("started")){
				console.log(value);
				setstatus("Started")
			}else{

				setstatus("Not Yet Started")
				storeData("started","Not Yet Started")
			}
        } catch (e) {
            console.log(e);
        }
    };
	const pics = {
		love: require('./love.jpg'),
		shradha: require('./shradhha.jpg')
	}
    const clearData = () => AsyncStorage.clear();

	useEffect(()=>{	
		if(isFocus){
			getData()
		}	
	 },[isFocus])
	return (

		<View style={{ flex: 1, alignItems: 'center', marginTop:10, gap: 6 }}>
			<ProfileCard name="Love Babbar" total={450}  pic={pics.love} nav={navigation}  TabName={"Love's DSA Sheet"} Data={DATALOVE} />
			<ProfileCard name="Shradha Khana" total={450}  pic={pics.shradha} nav={navigation}  TabName={"Shradha's DSA Sheet"} Data={DATASHRADHA} />

		</View>

	)
}

export default Profiles