import React, {useState,useEffect} from "react";                        
import {StyleSheet, Text,View, ScrollView,SafeAeraView,FlatList,ActivityIndicator,TouchableOpacity,Navigation,KeyboardAvoidingView,TextInput, Alert,RefreshControl} from "react-native";
import { SearchBar,ListItem ,Icon} from 'react-native-elements';


export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            dataSource: null,
            filteredData: null,
            searchQuery: "",
        }
    }

    addDots($text){
        var moneyDots = $text.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        return moneyDots;
      }

    componentDidMount() {
        //laod data when navigated from another screen
        this.focusListener = this.props.navigation.addListener('focus', () => { 
            this.makeRemoteRequest();
            }
        );

        this.onRefresh();
        this.makeRemoteRequest();
      }

    makeRemoteRequest = () => {
        return fetch('http://aeropolyplast.eu/api/displayAll')
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


    //search flatlist
    search = (searchQuery) => {
        this.setState({searchQuery: searchQuery});
        let filteredData = this.state.dataSource.filter(function (item) {
          return item.naziv.includes(searchQuery.toUpperCase()) || item.stevilkaNarocila.includes(searchQuery.toUpperCase()) || item.ident.includes(searchQuery.toUpperCase());
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
                            <Text style={styles.itemText}>{'Ident'}</Text>
                            <Text style={styles.itemText}>{'st.narocila'}</Text>
                            <Text style={styles.itemText}>{'Lokacija'}</Text>
                            <Text style={styles.itemText}>{'Zaloga'}</Text>
                    </View>

                    <FlatList
                        //data={this.state.dataSource}
                        data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.dataSource}
                        onRefresh={() => this.onRefresh()}
                        refreshing={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
 
                            <TouchableOpacity onPress={() => this.props.navigation.navigate
                                ('Export', { id: item.id.toString(), naziv: item.naziv,ident:item.ident,stevilkaNarocila:item.stevilkaNarocila,lokacija1:item.lokacija1,lokacija2:item.lokacija2, lokacija3:item.lokacija3,zaloga:item.zaloga,kolicina:item.kolicina })}>
                            <View style={styles.item}>
                                <Text  style={styles.itemText}>{item.naziv}</Text>
                                <Text  style={styles.itemText}>{item.ident}</Text>
                                <Text  style={styles.itemText}>{item.stevilkaNarocila}</Text>
                                <Text style={styles.itemText}>{item.lokacija1}{' '}{item.lokacija2}{' '}{item.lokacija3}</Text>
                                <Text style={styles.itemText}>{this.addDots(item.zaloga)}</Text>    
                            </View>
                            </TouchableOpacity> 

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
        backgroundColor: 'white',
        borderWidth:1,
        borderColor:'#5d5d5d',
        borderRadius:10,
        height:80,
        marginRight:'2%',
        marginLeft:'2%',
        marginBottom:'5%',
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
});