import React from 'react'
import {Text,View,TouchableOpacity,StyleSheet,TextInput,Image,KeyboardAvoidingView, Alert,ScrollView,Modal} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/MyHeader'

export default class HomeScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            userId : firebase.auth().currentUser.email,
            itemName:'',
            reasonToRequest:'',
            isItemRequestActive:'',
      requestedItemName:"",
      itemStatus:'',
      requestId:'',
      userDocId:'',
      docId:'',
             }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7);
      }
    
    
    
      addRequest =(itemName,reasonToRequest)=>{
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection('requested_items').add({
            "user_id": userId,
            "item_name":itemName,
            "reason_to_request":reasonToRequest,
            "request_id"  : randomRequestId,
            "item_status":'requested',
            "Date":firebase.firestore.FieldValue.serverTimestamp()
        })
    this.getItemRequest()
        db.collection('users').where('email_id','==',userId).get()
        .then((snapShot)=>{
          snapShot.forEach((doc)=>{
    db.collection('users').doc(doc.id).update({
      isItemRequestActive:true
    })
          })
        })
    
        this.setState({
            itemName :'',
            reasonToRequest : '',
            requestId:randomRequestId
        })
    
        return Alert.alert("Item Requested Successfully")
      }
      getItemRequest =()=>{
        // getting the requested book
      var bookRequest=  db.collection('requested_items')
        .where('user_id','==',this.state.userId)
        .get()
        .then((snapshot)=>{
          snapshot.forEach((doc)=>{
            if(doc.data().item_status !== "received"){
              this.setState({
                requestId : doc.data().request_id,
                requestedItemName: doc.data().item_name,
                itemStatus:doc.data().item_status,
                docId     : doc.id
              })
            }
          })
      })}
      
    getItemRequestActive(){
      db.collection('users').where('email_id','==',this.state.userId).onSnapshot((quary)=>{
        quary.forEach((doc)=>{
          this.setState({
            isItemRequestActive:doc.data().isItemRequestActive,
            userDocId:doc.id
          })
        })
      })
    }
    componentDidMount(){
      this.getItemRequest();
      this.getItemRequestActive()
    }
    receivedItems = (itemName)=>{
      var userId = this.state.userId
      var requestId = this.state.requestId
      db.collection('received_items').add({
        'user_id':userId,
        'item_name':itemName,
        'request_id':requestId,
        'itemstatus':received
      })
    }
    updateItemRequestStatus = ()=>{
      db.collection('requested_items').doc(this.state.docId).update({item_Status:'received'})
      db.collection('users').where('email_id','==',this.state.userId).get().then((snapShot)=>{
        snapShot.forEach((doc)=>{
          db.collection('users').doc(doc.id).update({
            isItemRequestActive:false
          })
        })
      })
    }
    submitForm=async()=>{
        db.collection("User").add({
          'itemName' : this.state.itemName,
          'Description' : this.state.reasonToRequest,
        })
        this.setState({
            userId:firebase.auth().currentUser.email,
          itemName:'',
          reasonToRequest:''
        })
        return(
            Alert.alert("Item Requested Successfully")
        )
    }
    render(){
        return(
            <KeyboardAvoidingView style={styles.KeyboardStyles}>
               <MyHeader title="Request Items" navigation ={this.props.navigation}/>

            <View style={{flex:1}}>
                    <TextInput style={styles.formtextinput} placeholder={"Enter item Name"}onChangeText={(text)=>{this.setState({
                        itemName:text
                    })}}value={this.state.itemName}></TextInput>
                     <TextInput style={styles.formtextinput} placeholder={"Reason For The Book"}onChangeText={(text)=>{this.setState({
                        reasonToRequest:text
                    })}}value={this.state.reasonToRequest}multiline numberOfLines={8}></TextInput>
            
                           </View>
             <TouchableOpacity onPress={async()=>{
                var userUser = await this.submitForm()
              }}style={styles.button}><Text>Add Item</Text>
              </TouchableOpacity>
              </KeyboardAvoidingView>
        )
    }
    }
    const styles = StyleSheet.create({
        KeyboardStyles:{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        },
        formtextinput:{
            width:'100%',
            height:50,
            alignSelf:'center',
            borderColor:'#FFAB91',
            borderRadius:10,
            borderWidth:1,
            marginTop:90,
      padding:10
          },
          button:{
            width:300,
            height:50,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:25,
            backgroundColor:"#ff9800",
            shadowColor: "#000",
            shadowOffset: {
               width: 0,
               height: 8,
            },
            shadowOpacity: 0.30,
            shadowRadius: 10.32,
            elevation: 16,
          },
    })