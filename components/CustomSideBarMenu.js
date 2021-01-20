import React, { Component} from 'react';
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import {Avatar} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export default class CustomSideBarMenu extends Component{
  state={
    userId:firebase.auth().currentUser.email,
    image:null,
    name:'',
    docId:''
  }
  selectPicture=async()=>{
    const {cancelled,uri}=await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,3],
      quality:1
    })
    if(!cancelled){
      this.updateProfilePicture(uri)
    }
  }
  updateProfilePicture=(uri)=>{
    db.collection('users').doc(this.state.docId).update({
      image : uri
    })
  }
  getUserProfile(){
    db.collection("users").where('email_id','==',this.state.userId).onSnapshot((query)=>{
      query.forEach((doc)=>{this.setState({
        name:doc.data().first_name+' '+doc.data().last_name,
docId:doc.id,
image:doc.data().image
      })})
    })
  }
  componentDidMount(){
    this.getUserProfile()
  }
  render(){
    return(
      <View style={{flex:1}}>
        <View style={{flex:0.5,borderColor:'red',borderWidth:2,alignItems:'center',backgroundColor:'orange'}}>
          <Avatar rounded icon={{name:'user',type:'font-awesome'}}source={{uri:this.state.image}}size='medium'overlayContainerStyle={{backgroundColor:'white'}}onPress={()=>{this.selectPicture()}}activeOpacity={0.7}containerStyle={{flex:0.75,width:'40%',height:'20%',marginLeft:20,marginTop:30,borderRadius:40}}></Avatar>
    <Text style={{fontWeight:'100',fontSize:20,padding:10}}>{this.state.name}</Text>
        </View>
                <View style={{flex:0.1}}>
                    <DrawerItems {...this.props}></DrawerItems>
                </View>
                <View style={{flex:0.2,justifyContent:'flex-end',paddingBottom:30}}>
                    <TouchableOpacity style={{height:30,width:'50%',justifyContent:'center',padding:10}}onPress={()=>{this.props.navigation.navigate('SignupLoginScreen')
                firebase.auth().signOut()}}>
                    <Text style={{fontSize:30,fontWeight:'bold'}}>Log Out</Text>
                    </TouchableOpacity></View>
                </View>
        )
    }
}