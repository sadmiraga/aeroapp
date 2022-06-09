import * as React from 'react';
import { Text, View,Button, TextInput,KeyboardAvoidingView,AsyncStorage,StyleSheet,Alert,
  Picker,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

console.disableYellowBox = true;

import { Input } from 'react-native-elements';


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
        kolicina: '',
        isLoading: true,
      }
    }

    clearDots($text){
      return $text.replace(".","");
    }

    addDots($text){
      var moneyDots = $text.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
      return moneyDots;
    }


    successNotification(){
      Alert.alert(
        'Uspešno',
        "Uspešno ste dodali izdelek: \n naziv = "+this.state.naziv
        +"\n ident = "+this.state.ident
        +"\n stevilka narocila = "+this.state.stevilkaNarocila        
        +"\n zaloga = "+this.state.zaloga
        +"\n opis = "+this.state.kolicina
        +"\n lokacija = "+this.state.lokacija1+" "+this.state.lokacija2+" "+this.state.lokacija3,
        [
            { text: 'Ok', onPress: () => this.props.navigation.navigate('Home') },
            //MeHome
        ],
        { cancelable: false },
      );
    }
  

    //SLANJE PODATAKA 
    posalji(){
      if(this.state.lokacija1 == 0 ||  this.state.lokacija2 == 0 || this.state.lokacija3 == 0 || this.state.stevilkaNarocila == '' || this.state.zaloga == '' || this.state.ident == '' || this.state.naziv == '' || this.state.kolicina == ''){
        Alert.alert('Izberite vse podatke pred uvozom podatkov');
      } else {

          fetch('http://aeropolyplast.eu/api/newProduct', {
            'method': 'POST',
            'headers': {
              'Accept':'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'naziv': this.state.naziv,
              'ident': this.state.ident,
              'zaloga': this.state.zaloga,
              'stevilkaNarocila': this.state.stevilkaNarocila,
              'lokacija1': this.state.lokacija1,
              'lokacija2': this.state.lokacija2,
              'lokacija3': this.state.lokacija3,
              'kolicina': this.state.kolicina,
            })
          })

           
          this.successNotification();

          this.setState({
            naziv: '',
            ident: '',
            zaloga: '',
            stevilkaNarocila: '',
            lokacija1: 0,
            lokacija2: 0,
            lokacija3: 0,
            kolicina: '',

          })

      }

    }

    render(){
      return (
        
        <ScrollView>
        <KeyboardAvoidingView behavior="padding">
              
              <TextInput style={styles.unosTexta}
                multiline={false}
                placeholder='NAZIV'
                autoCapitalize = {"characters"}
                underlineColorAndroid='transparent'
                autoCapitalize = {"characters"}
                onChangeText={(text) => this.setState({ naziv: text })}
                ref={component => this._textInput = component}
                value={this.state.naziv}
              />

              <TextInput style={styles.unosTexta}
                multiline={false}
                placeholder='IDENT'
                underlineColorAndroid='transparent'
                autoCapitalize = {"characters"}
                onChangeText={(text) => this.setState({ ident: text })}
                ref={component => this._textInput = component}
                value={this.state.ident}
              />

              <TextInput style={styles.unosTexta}
                multiline={false}
                placeholder='ZALOGA'
                keyboardType='numeric'
                underlineColorAndroid='transparent'
                autoCapitalize = {"characters"}
                onChangeText={(text) => this.setState({ zaloga: this.clearDots(text) })}
                ref={component => this._textInput = component}
                value={this.addDots(this.state.zaloga.toString())}
              />

              
              <TextInput style={styles.unosTexta}
                multiline={false}
                placeholder='STEVILKA NAROCILA'
                underlineColorAndroid='transparent'
                autoCapitalize = {"characters"}
                onChangeText={(text) => this.setState({ stevilkaNarocila: text })}
                ref={component => this._textInput = component}
                value={this.state.stevilkaNarocila}
              />

              <TextInput style={styles.unosTexta}
                multiline={false}
                placeholder='OPIS'
                underlineColorAndroid='transparent'
                autoCapitalize = {"characters"}
                onChangeText={(text) => this.setState({ kolicina: text })}
                ref={component => this._textInput = component}
                value={this.state.kolicina}
              />

              <View style={styles.dropDownMeni}>
              <Picker
                mode="dropdown"
                placeholder="LOKACIJA 1"
                note={false}
                onValueChange={(ItemValue, itemIndex) => this.setState({ lokacija1: ItemValue })}
                style={{ color: '#5d5d5d'}}
                selectedValue={this.state.lokacija1}
              >
                <Picker.Item label="Izberite prvo lokacijo" value="0" />
                <Picker.Item label="I" value="I" />
                <Picker.Item label="II" value="II" />
                <Picker.Item label="III" value="III" />
                <Picker.Item label="IV" value="IV" /> 
                <Picker.Item label="V" value="V" />
                <Picker.Item label="VI" value="VI" />
                <Picker.Item label="VII" value="VII" />
                <Picker.Item label="VIII" value="VIII" />
                <Picker.Item label="IX" value="IX" />
                <Picker.Item label="X" value="X" />
                <Picker.Item label="XI" value="XI" />
                <Picker.Item label="XII" value="XII" />
              </Picker>
              </View>


              <View style={styles.dropDownMeni}>
              <Picker
                mode="dropdown"
                placeholder="LOKACIJA 2"
                note={false}
                onValueChange={(ItemValue, itemIndex) => this.setState({ lokacija2: ItemValue })}
                selectedValue={this.state.lokacija2}
                style={{ color: '#5d5d5d'}}
                >
                
                <Picker.Item label="Izberite drugo lokacijo" value="0" />
                <Picker.Item selected  label="1" value="1" />
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
                <Picker.Item label="14" value="14" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="16" value="16" />
                <Picker.Item label="17" value="17" />
                <Picker.Item label="18" value="18" />
                <Picker.Item label="19" value="19" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="21" value="21" />
              </Picker>
              </View>

              <View style={styles.dropDownMeni}>
              <Picker
                mode="dropdown"
                placeholder="LOKACIJA 3"
                note={false}
                onValueChange={(ItemValue, itemIndex) => this.setState({ lokacija3: ItemValue })}
                selectedValue={this.state.lokacija3}
                style={{ color: '#5d5d5d'}}
                >

                <Picker.Item label="Izberite tretjo lokacijo" value="0" />
                <Picker.Item label="a" value="a" />
                <Picker.Item label="b" value="b" />
                <Picker.Item label="c" value="c" />
                <Picker.Item label="d" value="d" />
                <Picker.Item label="e" value="e" />
                <Picker.Item label="f" value="f" />
                <Picker.Item label="g" value="g" />
              </Picker>
              </View>


              <TouchableOpacity onPress={() => this.posalji()}>
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
      borderColor:'#5d5d5d',
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


  