
import { ScrollView, Text } from 'react-native'
import { View } from 'react-native';
import Row from './Row';

const Card = ({ route, navigation }) => {
    const { Data } = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 2 }}>
            <View style={{ height: "auto", padding: 2 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 4}}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Problem</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Status</Text>
                </View>
                <ScrollView>
                    {Data.map((item,i)=><Row item={item} key={i} />)}
                </ScrollView>
                
                </View>
        </View>
    )
}

export default Card

