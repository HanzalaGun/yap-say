import React, { Component } from 'react'
import { Text, View, StyleSheet ,TouchableOpacity,ScrollView,Platform,Dimensions} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import SQLite from 'react-native-sqlite-storage' ; 

import YapHead,{addNewYap} from './YapHead';
import SayHead,{addNewSay} from './SayHead';
import SayBody from './SayBody'
import YapBody from './YapBody'



export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.db=SQLite.openDatabase("yapsay.db", "1.0", "Yapsay Database", 200000, openCB => {

        }, errorCB => {
           console.warn(errorCB);
        });
      
        this.state={
            activePage:0,
            color:'purple'
        }
    }
    yapPress(){
  
        this.setState({activePage:0,
        color:'purple'
        })

    }
    sayPress(){
  
        this.setState({activePage:1,
        color:'maroon'
        })
    }

    componentWillUnmount(){
        this.db.close(); 
      }
    render() {
        return (
            <View style={styles.container}>
                <LinearGradient colors={[this.state.color, 'black']} style={{
                    alignSelf:'center',
                    height:Dimensions.get('window').width*0.8,
                    width:Dimensions.get('window').width*1.75,
                    borderBottomEndRadius:Dimensions.get('window').width,
                    borderBottomStartRadius:Dimensions.get('window').width,
                    
                    
                }}>
                    
                <View style={styles.topHeader}>
                    <Text style={styles.headText}>
                        Yap-Say
                    </Text>
                </View>
                {this.state.activePage==0? <YapHead/>:<SayHead/>}
                </LinearGradient>
                <ScrollView>

                        <View style={{height:45}}/>
                        {this.state.activePage==1?<SayBody/>:<YapBody/>}
                        <View style={{height:60}}/>

                </ScrollView>
                <LinearGradient colors={['black',this.state.color]} style={styles.tab}>
                    <View >
                        <TouchableOpacity
                        onPress={()=>this.yapPress()}>
                            <Text style={this.state.activePage==0?styles.tabbutton1:styles.tabbutton0}>
                                YAPILACAKLAR
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                        onPress={()=>this.sayPress()}>
                            <Text style={this.state.activePage==1?styles.tabbutton1:styles.tabbutton0}>
                                SAYILACAKLAR
                            </Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                <View style={styles.list}>
                    <ScrollView>

                    </ScrollView>
                </View>
                    <LinearGradient colors={['black', this.state.color]} style={styles.ekle} >
                        <TouchableOpacity style={styles.ekle1}
                        onPress={()=>{this.state.activePage==0?addNewYap(): addNewSay()

                        }}>
                            <Text style={{color:'white'}}>EKLE</Text>

                        </TouchableOpacity>
                    </LinearGradient>

            </View>
        )
    }
}
const styles =StyleSheet.create({
    container:{
        flex:1,
    },
    topHeader:{
        
        alignItems:'center',
        marginTop:Platform.OS==='ios' ? 36 :0



    },
    headText:{
        fontSize:21,
        fontWeight:'900',
        color:'white'
    },
    
    tabbutton0:{
        color:'white',
        padding:10,
        fontSize:16,
        fontWeight:'900',
        
        
        
    },
    tabbutton1:{
        color:'white',
        padding:10,
        fontSize:16,
        fontWeight:'900',
        textDecorationLine:'underline'
        
        
        
    },
    tab:{
        width:Dimensions.get('window').width,
        flexDirection:'row',
        paddingBottom:20,
        position:'absolute',
        bottom:0,
        justifyContent:'center'
        
        
    },
    ekle:{
        justifyContent:'center',
        height:90,
        width:90,
        borderColor:'white',
        borderWidth:5,
        borderRadius:90,
        padding:10,
        position:'absolute',
        top:(Dimensions.get('window').width*0.8)-45,
        left:(Dimensions.get('window').width/2)-45,
        
    },
    ekle1:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
