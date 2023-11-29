
import { Button, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileCard = ({name = "Creater Name",total,status="Not Yet Started",pic,nav,TabName,Data}) => {

        const initialValue = 0;
        const t = Data.reduce((count,item)=> count+item.Ques.length,initialValue)
        
    return (
        <View style={styles.profileCard}>
        <View ><Image source={pic}  style={styles.profilePicture}/></View>
         <View style={styles.details}>
             <Text style={styles.title}>{name}</Text>
             <View style={styles.question}>
             <Text>Total Questions : </Text><Text style={{fontWeight:'600',fontSize:18,textAlign:'center',color:"orange"}}>{t}</Text>
             </View>
             <Text style={{color:'#ADD8E6'}} onPress={()=>Linking.openURL('https://www.youtube.com/@LoveBabbar')} > Youtube Channel </Text>
             <View>
                 <View style={{flexDirection:"row",justifyContent:"space-between",fontSize:12}}>
                 <Text style={[styles.badge,{color:status === "Not Yet Started" ?"red":"#00FFC5",backgroundColor:status === "Not Yet Started" ?"#ff9999":"green"},]} >{status}</Text>                   
                 </View>
                 
             </View>
             <Pressable onPress={() => {                
                nav.navigate('Topics', {
                  DATA:Data,
                  name:TabName,
                  bg:"#FFA1F5",
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


const styles = StyleSheet.create({
    profileCard:{
        borderWidth:2,
        paddingTop:13,
        width:"80%",
        height:200,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        
    },
    profilePicture:{
        margin:4,
        alignSelf:"flex-start",
        width:100,
        height:100,
        borderRadius:12
    },
    details:{
        width:"60%"
    },
    title:{
        fontSize:25,
        fontWeight:"bold"
    },
    question:{
        flexDirection:"row",
        fontWeight:"bold",
        alignItems:"center"
    },
    badge:{
        width:"60%",
        backgroundColor:"#ff9999",
        borderRadius:11,
        padding:1,
        textAlign:"center"
    },
    progressBar:{
        width:"100%",
        height:10,
        backgroundColor:"#ff9999",
        marginVertical:2,
        borderRadius:12
    },
    progress:{
        width:"10%",
        height:10,
        backgroundColor:"red",
        borderRadius:12,

    },
    button:{
        alignItems:"center",
        paddingVertical:2,
        borderWidth:2,
        width:"20%",
        alignSelf:"flex-end",
        borderRadius:6
    }

})
export default ProfileCard
