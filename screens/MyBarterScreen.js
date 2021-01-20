import React, { Component } from 'react'
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native'
import {Card,Header,Icon, ListItem} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/MyHeader.js'

export default class MyBarterScreen extends Component{
    constructor(){
        super()
        this.state= {
            donorId:firebase.auth().currentUser.email,
            donorName:'',
            allDonations:[]
        }
        this.requestref = null
    }
    static navigationOptions = {header:null}
    getDonorDetails = (donorId)=>{
        db.collection("users").where("email_id","==",donorId).get()
        .then((snapShot)=>{
            snapShot.forEach((doc)=>{
                this.setState({
                    'donorName':doc.data().first_name+' '+doc.data().last_name
                })
            })
        })
    }
    getAllDonations=()=>{
        this.requestref=db.collection("all_donations").where('donor_Id','==',this.state.donorId).onSnapshot((snapShot)=>{
            var allDonations = []
            snapShot.docs.map((doc)=>{
                var donation = doc.data()
                donation['doc_id']=doc.id
                allDonations.push(donation)
            })
            this.setState({
                allDonations:allDonations
            })
        })
    }
    sendItem=(itemDetails)=>{
        if(itemDetails.request_status==='Item Sent'){
            var requeststatus = 'donor interested'
            db.collection("all_donations").doc(itemDetails.doc_id).update({
                'request_status':'donor interested'
            })
            this.sendNotification(itemDetails,requeststatus)
        }
        else{
            var requeststatus ='Item Sent'
            db.collection("all_donations").doc(itemDetails.doc_id).update({
                'request_status':'Item Sent'
            })
            this.sendNotification(itemDetails,requeststatus)
        }
    }
    sendNotification=(itemDetails,requeststatus)=>{
        var requestid = itemDetails.request_id
        var donorId = itemDetails.donor_id
        db.collection("all_notifications").where("request_id",'==',requestid).where("donor_id",'==',donorId).get().then((snapShot)=>{
            snapShot.forEach((doc)=>{var message = ''
        if(requeststatus = 'Item Sent'){
            message = this.state.donorName+'Sent You The Item'
        }
        else{message = this.state.donorName+'Has Shown Interest In Donating The Item'}
        db.collection("all_notifications").doc(doc.id).update({
            'message':message,
            'notification_status':'unread',
            'date':firebase.firestore.FieldValue.serverTimestamp()
        })
        })
        })
    }
    keyExtractor=(item,index)=>{index.toString()}
    renderitem = ({item,i})=>{
        <ListItem key={i}
        title={item.book_name}subtitle={'requested by:'+item.requested_by+'\nstatus:'+item.request_status}
        titleStyle={{color:'black',fontWeight:'bold'}}leftElement={<Icon name="item" type='font_awesome'color='#696969'></Icon>}
        rightElement={
            <TouchableOpacity style={[styles.button,{backgroundColor:item.request_status==='Item Sent'?'green':'#FF5722'}]}onPress={()=>{this.sendItem(item)}}>
                <Text style={{color:'#FFFF'}}>{item.request_status==='Item Sent'?'Item Sent':'Send Item'}</Text>
            </TouchableOpacity>
        }bottomDivider
        ></ListItem>
    }

render(){
    return(
      <View style={{flex:1}}>
        <MyHeader navigation={this.props.navigation} title="My Donations"/>
        <View style={{flex:1}}>
          {
            this.state.allDonations.length === 0
            ?(
              <View style={styles.subtitle}>
                <Text style={{ fontSize: 20}}>List of all item Donations</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allDonations}
                renderItem={this.renderItem}
              />
            )
            }
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
 button:{
   width:100,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8
    },
   elevation : 16
 },
 subtitle :{
   flex:1,
   fontSize: 20,
   justifyContent:'center',
   alignItems:'center'
 }
})
