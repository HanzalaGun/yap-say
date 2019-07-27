import React, { Component } from 'react'
import { Text, View ,Dimensions,TouchableOpacity,ScrollView} from 'react-native'
import SQLite from 'react-native-sqlite-storage'

export default class SayBody extends Component {
    constructor(props){
        super(props); 
        this.db=SQLite.openDatabase("yapsay.db", "1.0", "Yapsay Database", 200000, openCB => {

        }, errorCB => {
           console.warn(errorCB);
        });
    
        this.state = {
          items:[],
          
        }
        this.fetchItems()
      
      }
      componentWillUpdate(){
        this.fetchItems()
      }
     componentWillReceiveProps(){
       this.fetchItems()
     }
     add(id,baslangic){
      this.db.transaction((tx) => {
         
        tx.executeSql('UPDATE SAYIL SET baslangic = (:baslangic) WHERE ID = (:id)', [baslangic+1,id], (tx, results) => {
          },error => {
            console.warn(error); 
          });
      });
     }
     move(id,baslangic){
      this.db.transaction((tx) => {
         
        tx.executeSql('UPDATE SAYIL SET baslangic = (:baslangic) WHERE ID = (:id)', [baslangic-1,id], (tx, results) => {
          },error => {
            console.warn(error); 
          });
      });
     }
     delete(id){
      this.db.transaction((tx) => {
         
        tx.executeSql('DELETE FROM SAYIL WHERE ID = (:id)', [id], (tx, results) => {
          },error => {
            console.warn(error); 
          });
      });
     }
     apply(id){
      this.db.transaction((tx) => {
         
        tx.executeSql('UPDATE SAYIL SET yapildi = (:yapildi) WHERE ID = (:id)', [1,id], (tx, results) => {
          },error => {
            console.warn(error); 
          });
      });

     }
    render() {
        return (
               <View style={{flexDirection:'column'}}>
            {this.state.items.map( (user) => {
              return (
                <View key={user.id} style={user.yapildi==0?{borderColor:'maroon',borderWidth:2,
                borderRadius:4,height:Dimensions.get('window').height/10,
                padding:5,margin:5,justifyContent:'space-between',backgroundColor:'maroon',
                flexDirection:'row'
                }:{borderColor:'gray',borderWidth:2,
                borderRadius:4,height:Dimensions.get('window').height/10,
                padding:5,margin:5,justifyContent:'space-between',backgroundColor:'gray',
                flexDirection:'row'
                }}>
                  <View style={{justifyContent:'space-between'}}>

                    <Text style={{color:'white',fontWeight:'900',fontSize:16}}>{user.yapildi==0?user.baslik:user.baslik+'(YAPILDI)'}</Text>
                    <Text style={{fontSize:35,fontWeight:'900',color:'white'}}>{user.baslangic}</Text>
                  </View>
                  {user.yapildi==0?<TouchableOpacity onPress={()=>this.add(user.id,user.baslangic)}
                   style={{alignItems:'center',justifyContent:'center',
                   backgroundColor:'white',width:Dimensions.get('screen').width/5.5,
                   height:Dimensions.get('screen').width/5.5,
                   borderRadius:Dimensions.get('screen').width/10}}>
                    <View>
                      <Text style={{color:'maroon',fontSize:40,fontWeight:'900'}}>
                        +
                      </Text>
                    </View>
                  </TouchableOpacity>:null}
                  
                  <View style={{justifyContent:'space-between'}}>
                  <TouchableOpacity onPress={()=>this.delete(user.id)}>
                    <View>
                      <Text style={{color:'white'}}>
                        x
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {user.yapildi==0?<TouchableOpacity onPress={()=>this.apply(user.id)}>
                    <View>
                      <Text style={{color:'white'}}>
                        ✓
                      </Text>
                    </View>
                  </TouchableOpacity>:null}
                  {user.yapildi==0?<TouchableOpacity onPress={()=>this.move(user.id,user.baslangic)}>
                    <View>
                      <Text style={{color:'white'}}>
                        -
                      </Text>
                    </View>
                  </TouchableOpacity>:null}
                  
                  </View>
              </View>
              )
            })}
          </View>
        )
    }
    fetchItems=()=>{

        this.db.transaction((tx) => {
         
          tx.executeSql('select * from SAYIL order by yapildi ASC', [], (tx, results) => {
            var len = results.rows.length;
            
            const items = [] ; 
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
               items.push({id:row.ID,baslik:row.baslik,baslangic:row.baslangic,yapildi:row.yapildi}); 
               
            }

            this.setState({
              items:items
            })
            },error => {
              console.warn(error); 
            });
        });
      }
}
