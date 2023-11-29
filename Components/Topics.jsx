
import { FlatList,ScrollView, View } from 'react-native'
import TopicCard from './TopicCard'

const Topics = ({ route, navigation }) => {
    const {DATA} = route.params
    
    return (
        <View>
            <ScrollView>
                {
                    DATA.map((item,i)=><TopicCard key={i} heading={item.topic} by={item.By} data={item.Ques} img={item.img}  nav={navigation}/>)
                }
            </ScrollView>
        </View>
    )
}

export default Topics