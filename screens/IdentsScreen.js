import React, {useState,useEffect} from "react";                        
import {StyleSheet, Text,View, ScrollView,SafeAeraView,FlatList,ActivityIndicator,TouchableOpacity,Navigation,KeyboardAvoidingView,TextInput, Alert,RefreshControl} from "react-native";
import { SearchBar,ListItem ,Icon} from 'react-native-elements';


export default class IdentsScreen extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            dataSource: null,
            filteredData: null,
            searchQuery: "",
        }
    }

    componentDidMount(){
        this.onRefresh();
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {

        return fetch('http://aeropolyplast.eu/api/idents')
        .then( (response) => response.json() ) 
        .then( (responseJson) => {

            this.setState({
                isLoading:false,
                dataSource: responseJson,
            })

        })
        .catch((error) => {
            console.log(error)
        });
    } //end of custom remote request 


    search = (searchQuery) => {
        this.setState({searchQuery: searchQuery});
        let filteredData = this.state.dataSource.filter(function (item) {
          return item.naziv.includes(searchQuery.toLowerCase());
        });
        this.setState({filteredData: filteredData});
      };


      onRefresh = () => {
        this.makeRemoteRequest();
      }

    render() {

        //on load dispaly acticvity indicator
        if(this.state.isLoading){
            return (
                <View style={styles.container}>
                    <ActivityIndicator/>
                </View>
            )
        } else{
            return (
                <View style={{flex: 1}}>

                <SearchBar placeholder="Iskanje..." 
                            lightTheme  
                            onChangeText={this.search} 
                            value={this.state.searchQuery}
                            containerStyle={{backgroundColor: 'transparent'}}
                            inputContainerStyle={{backgroundColor: 'white'}} />

                    <View style={styles.itemsHeader}>
                            <Text style={styles.itemText}>{'Naziv'}</Text>
                            <Text style={styles.itemText}>{'Zaloga'}</Text>
                    </View>

                    <FlatList
                        //data={this.state.dataSource}
                        data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.dataSource}
                        onRefresh={() => this.onRefresh()}
                        refreshing={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
 
                            <View style={styles.item}>
                                <Text  style={styles.itemText}>{item.naziv}</Text>
                                <Text  style={styles.itemText}>{item.id}</Text>
                            

                            </View>

                        )}
                        />
                </View >
            );

        } 
    }
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        justifyContent:'space-evenly',
        backgroundColor: 'transparent',
        borderTopWidth:1,
        borderColor:'#5d5d5d',
        height:80,
        marginRight:'2%',
        marginLeft:'2%',
    },



    itemText:{
        flex: 3,
        fontSize: 15,
        textAlign:'center',
    },

    itemsHeader:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginLeft:'2%',
        
    },

    unosTexta: {
        backgroundColor: '#FFFFFF',
        width: '80%',
        marginRight: '20%',
        borderWidth:1,
        borderColor: 'grey',
        borderRadius:10,
        height:40,
        textAlign:'center',
        marginTop:'10%',
        marginBottom:'20%'
    },

    searchButton:{
        backgroundColor:'green',
        color:'white',
        width:'20%',
        marginLeft:'80%',
        
    }
    
});