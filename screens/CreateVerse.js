import React ,{useState} from "react";
import { Text, View, TextInput, StyleSheet ,Dimensions, TouchableOpacity } from "react-native";
import * as SQLite from 'expo-sqlite'
import { useNavigation } from "@react-navigation/native";


const CreateVerse = () => {
    const db = SQLite.openDatabase('verses.db') 
    const [title, setTitle] = useState('')
    const [descriptions,setDescriptions] = useState('')
    const [line, setLine] = useState('')
    const navigation = useNavigation()
  
    const create = ()=>{

        if (title == '' || descriptions == '' || line == '') {
            alert('Please Enter All the Values');
          } else {
       
        db.transaction(tx =>{
            tx.executeSql(
                "CREATE TABLE if not exists verse_table(id INTEGER PRIMARY KEY,title TEXT,descriptions TEXT, line TEXT);",
              );
              
            tx.executeSql(  
                'INSERT INTO verse_table(title,descriptions,line) values (?,?,?)',[title,descriptions,line],
                (textObj,result)=>(
                    console.log(result)
                )
            ,(textObj,error) =>(
                console.log("error",error)
            )
        )
    })}}
    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
            >Bibble
            </Text>
            <View style={styles.userRequest}>
                <TextInput
                    onChangeText={(value) => setTitle(value)}
                    style={styles.requestText}
                    placeholder="Tittle"
                    value={title}
                />
                <TextInput
                    onChangeText={(value) => setDescriptions(value)}
                    style={styles.requestText}
                    placeholder="Descriptions"
                    multiline
                    value={descriptions}
                />
                <TextInput
                    onChangeText={(value) => setLine(value)}
                    style={styles.requestText}
                    placeholder="line"
                    value={line}
                />
                <TouchableOpacity
                onPress={() => create()}
                style={styles.button}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigation.navigate("AllVerse")}
                style={styles.button}
                >
                    <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CreateVerse


const styles = StyleSheet.create({
    container:{
        backgroundColor: "#8cd98c",
        width:"100%",
        height:"100%"
    },
    userRequest:{
        marginVertical:100,
        justifyContent:'center',
        alignItems:"center",
        backgroundColor:"#339933", 
        borderRadius:23,
        marginHorizontal:10,
        width:Dimensions.get('screen').width - 20,
    },
    requestText:{
        width:"60%",
        height:40,
        margin:20,
        borderRadius:15,
        backgroundColor: "white",
        color: "black",
        paddingLeft:10,
        fontSize: 16,
        fontWeight:"bold"
    },
    button:{
        width:"60%",
        height:30,
        margin:20,
        borderRadius:15,
        alignItems:'center',
        backgroundColor:"#66cc66"
    },
    buttonText:{
        color:"white",
        fontWeight:"bold",
        fontSize:20
    },
    text:{
        color: "white",
        textAlign:"center",
        marginTop:100,
        fontWeight:"bold",
        fontSize:30,
        },
    selectPicker:{
        width: 100,
        height:50
        },
    optionTitle:{
        color:"white",
        fontWeight:"bold",
        fontSize:30,
    },
    item:{
       padding: 12 
    }
})
