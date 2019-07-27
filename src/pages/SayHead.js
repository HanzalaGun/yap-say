import React, { Component } from 'react'
import { Text, View , TextInput, StyleSheet,Dimensions,Alert} from 'react-native';
import SQLite from 'react-native-sqlite-storage' ; 

let baslik='!!--BAŞLIKSIZ--!!';
let baslangic=0;
export function addNewSay(){
  const db=SQLite.openDatabase("yapsay.db", "1.0", "Yapsay Database", 200000, openCB => {

  }, errorCB => {
     console.warn(errorCB);
  });
    db.transaction((tx) => {
      tx.executeSql('insert into SAYIL(baslik,baslangic,yapildi) values (:baslik,:baslangic,:yapildi)',
      [baslik,baslangic,0], (tx, results) => {
        Alert.alert('Eklendi!'); 
        
        
      },error => {
        console.warn(error,'asda'); 
      });
     // tx.executeSql('delete from SAYIL');
    });
    
    
  }

export default class YapHead extends Component {
    constructor(props) {
        super(props);
        
        this.db=SQLite.openDatabase("yapsay.db", "1.0", "Yapsay Database", 200000, openCB => {

        }, errorCB => {
           console.warn(errorCB);
        });
        
      }
     
      componentDidMount(){
    
        this.db.transaction((tx) => {
          tx.executeSql('CREATE TABLE  IF NOT EXISTS SAYIL(ID INTEGER PRIMARY KEY AUTOINCREMENT,baslik TEXT NOT NULL,baslangic INTEGER NOT NULL,yapildi INTEGER)', [], (tx, results) => {
            },error => {
              console.warn(error); 
            });
        });
    
      }
    
    render() {
        return (
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <TextInput style={styles.textInput}
                placeholder='Başlık Yazın' placeholderTextColor='black'
                onChangeText={ (text) => baslik=text}>
                </TextInput>
                <TextInput style={styles.textInput2}
                placeholder='Başlangıç Sayısını Girin' placeholderTextColor='black'
                keyboardType='number-pad'
                onChangeText={ (text) => baslangic=text}>
                </TextInput>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    textInput:{
        backgroundColor:'white',
        width:Dimensions.get('window').width-20,
        padding:10,
        borderRadius:10,
        margin:5
    },
    textInput2:{
        backgroundColor:'white',
        width:Dimensions.get('window').width-60,
        padding:10,
        borderRadius:10,
        margin:5,
        marginTop:30
    },
    
})