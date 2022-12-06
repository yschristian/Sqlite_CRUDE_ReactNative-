import React, { useState, useEffect } from "react";
import { Text, View, TextInput, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import * as SQLite from 'expo-sqlite'

const EditVerse = ({ route, navigation }) => {
    const db = SQLite.openDatabase('verses.db')
    const [title, setTitle] = useState('')
    const [descriptions, setDescriptions] = useState('')
    const [line, setLine] = useState('')
    const [currentVerse, setCurrentVerse] = useState([])

    // console.log(currentVerse);
    const id = route.params.id
    // console.log(id);

    useEffect(() => {
        const getSingleVerse = () => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        `SELECT * FROM verse_table WHERE id =${id}`,
                        
                        (_, { rows }) => {
                            // console.log(JSON.stringify(rows._array));
                            setCurrentVerse(rows._array)
                        },
                        (txObj, error) => console.log('Error ', error)
                    );
                }
            );
        }
        getSingleVerse()
    }, [])




    const editVerse = () => {
        db.transaction((tx) =>{
            tx.executeSql(
                `UPDATE verse_table  SET title = ?,descriptions = ?, line=? WHERE id=?`,
                [title,descriptions,line ,id],
                (tx, results) =>{
                    console.log(results);
                    if(results.rowsAffected >0){
                        alert('Verse Updated Successfully...')
                        navigation.navigate("AllVerse")
                    }else{
                        alert("Error")
                    }
                }
            )
            navigation.navigate("AllVerse")
        })
    }
    return (
        <View style={styles.container}>
            <Text
                style={styles.text}
            >Bibble
            </Text>
          {currentVerse &&  
            <View style={styles.userRequest} key={currentVerse[0]?.id}>
                <TextInput
                    onChangeText={(value) => setTitle(value)}
                    style={styles.requestText}
                    placeholder="Tittle"
                    value={title}
                    defaultValue={currentVerse[0]?.title}
                />
                <TextInput
                    onChangeText={(value) => setDescriptions(value)}
                    style={styles.requestText}
                    placeholder="Descriptions"
                    multiline
                    value={descriptions}
                    defaultValue={currentVerse[0]?.descriptions}
                />
                <TextInput
                    onChangeText={(value) => setLine(value)}
                    style={styles.requestText}
                    placeholder="line"
                    value={line}
                    defaultValue={currentVerse[0]?.line}
                />
                <TouchableOpacity
                    onPress={() => editVerse()}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                onPress={() => create()}
                style={styles.button}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity> */}
            </View>
        }
        </View>
    )
}

export default EditVerse

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#8cd98c",
        width: "100%",
        height: "100%"
    },
    userRequest: {
        marginVertical: 100,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#339933",
        borderRadius: 23,
        marginHorizontal: 10,
        width: Dimensions.get('screen').width - 20,
    },
    requestText: {
        width: "60%",
        height: 40,
        margin: 20,
        borderRadius: 15,
        backgroundColor: "white",
        color: "black",
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: "bold"
    },
    button: {
        width: "60%",
        height: 30,
        margin: 20,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: "#66cc66"
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },
    text: {
        color: "white",
        textAlign: "center",
        marginTop: 100,
        fontWeight: "bold",
        fontSize: 30,
    },
    selectPicker: {
        width: 100,
        height: 50
    },
    optionTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 30,
    },
    item: {
        padding: 12
    }
})
