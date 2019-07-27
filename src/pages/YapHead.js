import React, { Component } from 'react'
import { Text, View , TextInput, StyleSheet,Dimensions} from 'react-native'
import {  DatePicker } from 'native-base';
import SQLite from 'react-native-sqlite-storage' ; 
let baslik='!!--BAŞLIKSIZ--!!';
let aciklama='';
let tarih='';
export function addNewYap(){
  const db=SQLite.openDatabase("yapsay.db", "1.0", "Yapsay Database", 200000, openCB => {

  }, errorCB => {
     console.warn(errorCB);
  });
    db.transaction((tx) => {
      tx.executeSql('insert into YAPIL(baslik,aciklama,tarih,yapildi) values (:baslik,:aciklama,:tarih,:yapildi)',
      [baslik,aciklama,tarih,0], (tx, results) => {
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
        this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);
        this.db=SQLite.openDatabase("yapsay.db", "1.0", "Yapsay Database", 200000, openCB => {

        }, errorCB => {
           console.warn(errorCB);
        });
      }
      setDate(newDate) {
        this.setState({ chosenDate: newDate });
        tarih=newDate.toLocaleDateString();
      }
      componentDidMount(){
    
        this.db.transaction((tx) => {
          tx.executeSql('CREATE TABLE  IF NOT EXISTS YAPIL(ID INTEGER PRIMARY KEY AUTOINCREMENT,baslik TEXT NOT NULL,aciklama TEXT NOT NULL,tarih TEXT,yapildi INTEGER)', [], (tx, results) => {
            },error => {
              console.warn(error); 
            });
        });
    
      }
    render() {
        return (
            <View style={{alignItems:'center'}}>
                <TextInput style={styles.textInput}
                placeholder='Başlık Yazın' placeholderTextColor='black'
                onChangeText={ (text) => baslik=text}>
                </TextInput>
                <TextInput multiline={true} style={styles.textInput2}
                placeholder='Açıklama Yazın' placeholderTextColor='black'
                onChangeText={ (text) => aciklama=text}>
                </TextInput>
                <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    
                    locale={"tr"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={true}
                    animationType={"slide"}
                    androidMode={"default"}
                    placeHolderText="Yapılacak Tarihi Seçin"
                    placeHolderTextStyle={{ color: "white" }}
                    onDateChange={this.setDate}
                    disabled={false}
                    />
               
                
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
        width:Dimensions.get('window').width-20,
        padding:10,
        borderRadius:10,
        margin:5,
        height:90   
    },
    
})