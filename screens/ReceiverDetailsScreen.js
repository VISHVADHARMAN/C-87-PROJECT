import React from 'react'
import {Text,View,StyleSheet,TouchableOpacity, Button} from 'react-native'
import {Card,Header,Icon} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'

export default class ReceiverDetailsScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            userId:firebase.auth().currentUser.email,
            ExchangerId:this.props.navigation.getParam('details')['user_id'],
            ExchangerId:this.props.navigation.getParam('details')['request_id'],
            itemName:this.props.navigation.getParam('details')['item_name'],
            reasonForRequesting:this.props.navigation.getParam('details')['reason_to_request'],
            ExchangerName:'',
            ExchangerContact:'',
            Exchangeraddress:'',
            EWxchangerRequestDocId:''
        }
    }
    getExchangerDetails(){
        db.collection("users").where('email_id','==',this.state.ExchangerId).get()
        .then((snapShot)=>{
            snapShot.forEach((doc)=>{this.setState({
                ExchangerName:doc.data().first_name,
                ExchangerContact:doc.data.contact,
                Exchnageraddress:doc.data.address
            })})
        })
        db.collection("requested_items").where('request_id','==',this.state.requestId).get()
        .then((snapShot)=>{
            snapShot.forEach((doc)=>{this.setState({
                ExchangerRequestDocId:doc.id
            })})
        })
    }
    componentDidMount(){this.getExchangerDetails()}
    updateBookStatus=()=>{
        db.collection("MyBarters").add({
            book_name:this.state.bookName,
            request_id:this.state.requestId,
            requested_by:this.state.ExchangerName,
            donor_id:this.state.userId,
            request_status:'donorIntrested'
        })
    }
    render(){
        return(
<View style={styles.container}>
    <View style={{flex:0.1}}>
        <Header leftComponent={<Icon name='arrow-left'type='feather'color='#696969'onPress={()=>{this.props.navigation.goBack()}}></Icon>}
        centerComponent={{text:'donateItems',style:{color:'#90A5A9',fontSize:20,fontWeight:'bold'}}}backgroundColor='#EAF8FE'
        >
        </Header>
    </View>
    <View style={{flex:0.3}}>
        <Card title={'itemInformation'}titleStyle={{fontSize:20}}>
            <Card>
        <Text style={{fontWeight:'bold'}}>Name:{this.state.itemName}</Text>
            </Card>
            <Card>
        <Text style={{fontWeight:'bold'}}>reason:{this.state.reasonForRequesting}</Text>
            </Card>
        </Card>
    </View>
    <View style={{flex:0.3}}>
    <Card title={'ExchangerInformation'}titleStyle={{fontSize:20}}>
            <Card>
        <Text style={{fontWeight:'bold'}}>Name:{this.state.ExchangerName}</Text>
            </Card>
            <Card>
        <Text style={{fontWeight:'bold'}}>contact:{this.state.ExchangerContact}</Text>
            </Card>
            <Card>
        <Text style={{fontWeight:'bold'}}>address:{this.state.Exchangeraddress}</Text>
            </Card>
        </Card>
    </View>
    <View style={styles.buttonContainer}>
        {
            this.state.receiverId!==this.state.userId ?(
                <TouchableOpacity style={styles.button}onPress={()=>{this.updateItemStatus()
                    this.props.navigation.navigate('MyBarter')}}>
                        <Text>I Want To Donate</Text>
                    </TouchableOpacity>
            ):null
        }
    </View>
</View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    }
})




