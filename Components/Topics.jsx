
import { FlatList, ScrollView, Text, View } from 'react-native'
import TopicCard from './TopicCard'
import { useContext } from 'react'
import { DataStructure } from './Context'
import { useEffect, useState, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';

const Topics = ({ route, navigation }) => {

    const isFocus = useIsFocused()
    const { DATALOVE } = useContext(DataStructure)
    return (
        <View>
            <ScrollView>
                {
                    DATALOVE.map((item, i) => <TopicCard key={i} heading={item.topic} data={item.Ques} img={item.img} nav={navigation} />)
                }
            </ScrollView>
        </View>
    )
}

export default Topics
