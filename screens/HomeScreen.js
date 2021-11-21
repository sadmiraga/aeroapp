import React, {useState,useEffect} from "react";
import {StyleSheet, Text,View, ScrollView,SafeAeraView,FlatList,ActivityIndicator,TouchableOpacity,Navigation} from "react-native";

const productsURL = "http://aeropolyplast.eu/api/displayAll";

export default class HomeScreen extends React.Component {



    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            dataSource: null,
        }
    }

    componentDidMount(){

        return fetch('http://aeropolyplast.eu/api/displayAll')
        .then( (response) => response.json() ) 
        .then( (responseJson) => {

            this.setState({
                isLoading:false,
                dataSource: responseJson.products,
            })

        })
        .catch((error) => {
            console.log(error)
        });


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

            let products = this.state.dataSource.map((val,key)=> {

                return <View key={key} style={styles.item}>
                            <Text style={styles.itemText}>{val.naziv}</Text>
                            <Text style={styles.itemText}>{val.ident}</Text>
                            <Text style={styles.itemText}>{val.stevilkaNarocila}</Text>
                            <Text style={styles.itemText}>{val.lokacija1}{' '}{val.lokacija2}{' '}{val.lokacija3}</Text>
                            <Text style={styles.itemText}>{val.zaloga}</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate
                                ('Export', { id: val.id.toString(), naziv: val.naziv,ident:val.ident,stevilkaNarocila:val.stevilkaNarocilla,lokacija1:val.lokacija1,lokacija2:val.lokacija2, lokacija3:val.lokacija3,zaloga:val.zaloga })}>
                                <Text>export</Text>
                            </TouchableOpacity>
                       </View>
            });


            return (

                


                <ScrollView>
                    <View style={styles.itemsHeader}>
                            <Text style={styles.itemText}>{'Naziv'}</Text>
                            <Text style={styles.itemText}>{'Ident'}</Text>
                            <Text style={styles.itemText}>{'st. narocila'}</Text>
                            <Text style={styles.itemText}>{'Lokacija'}</Text>
                            <Text style={styles.itemText}>{'Zaloga'}</Text>
                       </View>
                {products}
                </ScrollView >
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
        marginBottom:'3%',
        justifyContent:'space-evenly',
        backgroundColor: 'transparent',
        borderWidth:1,
        borderColor:'#5d5d5d',
        borderRadius:20,
        marginTop:'20%',
    
    },

    itemText:{
        flex: 3,
    fontSize: 15,
    },

    itemsHeader:{
        flexDirection:'row',
        justifyContent:'space-evenly',
    },
    
});