import * as React from 'react';
import { Text, View,Button, TextInput,KeyboardAvoidingView,AsyncStorage,StyleSheet,Alert,
  Picker,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


  export default class ImportScreen extends React.Component{


    constructor(props){
      super(props);
      this.state={
        naziv: '',
        ident: '',
        zaloga: '',
        stevilkaNarocila: '',
        lokacija1: '',
        lokacija2: '',
        lokacija3: '',
        isLoading: true,
      }
    }


    //SLANJE PODATAKA 
    posalji($naziv,$ident,$zaloga,$stevilkaNarocila,$lokacija1,$lokacija2,$lokacija3){

      fetch('http://127.0.0.1:8000/api/import',{
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          'naziv':$naziv,
          'ident':$ident,
          'zaloga':$zaloga,
          'stevilkaNarocila':$stevilkaNarocila,
          'lokacija1':$lokacija1,
          'lokacija2':$lokacija2,
          'lokacija3':$lokacija3,
        })
      })

      this.setState({
        naziv: '',
        ident: '',
        zaloga: '',
        stevilkaNarocila: '',
        lokacija1: '',
        lokacija2: '',
        lokacija3: '',

      })

    }

    render(){
      return (
        
        <ScrollView>
        <KeyboardAvoidingView behavior="padding">
              
              <TextInput style={styles.unosTexta}
                multiline={false}
                placeholder='NAZIV'
                underlineColorAndroid='transparent'
                onChangeText={(text) => this.setState({ naziv: text })}
                ref={component => this._textInput = component}
                value={this.state.naziv}
              />

              <TextInput style={styles.unosTexta}
                multiline={false}
                placeholder='IDENT'
                underlineColorAndroid='transparent'
                onChangeText={(text) => this.setState({ ident: text })}
                ref={component => this._textInput = component}
                value={this.state.ident}
              />

              <TextInput style={styles.unosTexta}
                multiline={false}
                placeholder='ZALOGA'
                keyboardType='numeric'
                underlineColorAndroid='transparent'
                onChangeText={(text) => this.setState({ zaloga: text })}
                ref={component => this._textInput = component}
                value={this.state.zaloga}
              />

              
              <TextInput style={styles.unosTexta}
                multiline={false}
                placeholder='STEVILKA NAROCILA'
                underlineColorAndroid='transparent'
                onChangeText={(text) => this.setState({ stevilkaNarocila: text })}
                ref={component => this._textInput = component}
                value={this.state.stevilkaNarocila}
              />

              <View style={styles.dropDownMeni}>
              <Picker
                mode="dropdown"
                placeholder="LOKACIJA 1"
                note={false}
                onValueChange={(ItemValue, itemIndex) => this.setState({ lokacija1: ItemValue })}
              >
                <Picker.Item label="I" value="I" />
                <Picker.Item label="II" value="II" />
                <Picker.Item label="III" value="III" />
                <Picker.Item label="IV" value="IV" />
              </Picker>
              </View>


              <View style={styles.dropDownMeni}>
              <Picker
                mode="dropdown"
                placeholder="LOKACIJA 2"
                note={false}
                onValueChange={(ItemValue, itemIndex) => this.setState({ lokacija2: ItemValue })}
                >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="13" value="13" />
              </Picker>
              </View>

              <View style={styles.dropDownMeni}>
              <Picker
                mode="dropdown"
                placeholder="LOKACIJA 3"
                note={false}
                onValueChange={(ItemValue, itemIndex) => this.setState({ lokacija3: ItemValue })}
                >
                <Picker.Item label="a" value="a" />
                <Picker.Item label="b" value="b" />
              </Picker>
              </View>


              <TouchableOpacity onPress={() => this.posalji(this.state.naziv, this.state.ident,this.state.zaloga,this.state.stevilkaNarocila,this.state.lokacija1,this.state.lokacija1,this.state.lokacija2,this.state.lokacija3)}>
                        <Text style={styles.posaljiDugme}> UVOZ </Text>
              </TouchableOpacity>

        </KeyboardAvoidingView>
        </ScrollView>
        
      );
    }



  }




//CSS BEBOu 
const styles = StyleSheet.create({
  unosTexta: {
      backgroundColor: '#FFFFFF',
      width: '70%',
      marginLeft: '15%',
      marginRight: '15%',
      borderWidth:1,
      borderColor: 'grey',
      borderRadius:10,
      height:40,
      textAlign:'center',
      marginTop:'10%',
  },

  posaljiDugme: {
      width:'70%',
      marginRight:'15%',
      marginLeft:'15%',
      backgroundColor: '#93C572',
      color:'white',
      marginTop:'10%',
      marginBottom:'20%',
      height:50,
      borderRadius:10,
      alignContent:'center',
      textAlign:'center',
      fontSize:20,
      paddingTop:10,
      borderColor:'white',
      borderWidth:1,

  },

  dropDownMeni: {
    backgroundColor: '#FFFFFF',
    width: '70%',
    marginLeft: '15%',
    marginRight: '15%',
    borderWidth:1,
    borderColor: 'grey',
    borderRadius:10,
    height:50,
    textAlign:'center',
    marginTop:'10%',
    
  },

  container: {
      fontSize: 20,
  }


});


  