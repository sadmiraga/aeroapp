import * as React from 'react';
import { Text, View,Button, TextInput,KeyboardAvoidingView,AsyncStorage,StyleSheet,Alert,
  Picker,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import {Icon} from 'react-native-elements';



export default class ExportScreen extends React.Component{

  constructor(props){
    super(props);
    this.state={
      productID: this.props.route.params.id,
      exportValue: '',
      isLoading: true,
    }
  }


    successDeleteNotification = () => {
      Alert.alert(
        'Uspešno',
        "Uspešno ste izbrisali izdelek: "+this.props.route.params.naziv,
        [
            { text: 'Ok', onPress: () => this.props.navigation.navigate('Home') },
        ],
        { cancelable: false },
      );      
    }

    successNotification = () => {
      Alert.alert(
        'Uspešno',
        "Uspešno ste posodobili zalogo za izdelek "+this.props.route.params.naziv,
        [
            { text: 'Ok', onPress: () => this.props.navigation.navigate('Home') },
        ],
        { cancelable: false },
      );      
    }


    //EXPORT
    async export(){
      try{
        const response = await fetch('http://aeropolyplast.eu/api/export', {
          'method': 'POST',
          'headers': {
            'Accept':'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'id': this.state.productID,
            'vrednostIzvoza': this.state.exportValue,
          })

        });
          if (200 === response.status){
            this.setState({
              exportValue: 0,
            })
            this.successNotification();
          } else {
            alert('neuspešno');
          }

       } catch (e) {
        if ('string' === typeof e) {
            throw e;
        }
        throw 'Unknown error';
      } 
    }

    //DELETE
    async delete(){
      try{
        const response = await fetch('http://aeropolyplast.eu/api/deleteProduct', {
          'method': 'POST',
          'headers': {
            'Accept':'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'id': this.state.productID,
          })
        });

        if (200 === response.status){
          this.successDeleteNotification();
        } else {
          alert('neuspešno');
        }
          } catch (e) {
            if ('string' === typeof e) {
                throw e;
            }
            throw 'Unknown error';
          } 
    } //end of delete


    areYouSure(){
      Alert.alert(
        'Uspešno',
        "Ali ste prepičani da želite izbrisati izdelek: : "+this.props.route.params.naziv,
        [
            { text: 'Ja', onPress: () => this.delete() },
            //MeHome
        ],
        { cancelable: true },
      );
    }


    format($value){
      return new Intl.NumberFormat('en-IN', {
      }).format($value);
    
    }
      
    render(){
      return (
        
        <ScrollView>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => this.areYouSure()}>
                          <View style={styles.button}><Icon name='trash-outline' type='ionicon' color='#5d5d5d' /></View>
            </TouchableOpacity>

            
            <TouchableOpacity onPress={() => this.props.navigation.navigate
                              ('Import', 
                              { id: this.state.productID,
                              naziv:this.props.route.params.naziv,
                              zaloga:this.props.route.params.zaloga,
                              })}>
                      <View style={styles.button}><Icon name='add-outline' type='ionicon' color='#5d5d5d' /></View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate
                              ('Edit', { id: this.state.productID,
                                        naziv:this.props.route.params.naziv,
                                        ident:this.props.route.params.ident,
                                        kolicina:this.props.route.params.kolicina,
                                        lokacija1:this.props.route.params.lokacija1,
                                        lokacija2:this.props.route.params.lokacija2,
                                        lokacija3:this.props.route.params.lokacija3,
                                        zaloga:this.props.route.params.zaloga,
                                        stevilkaNarocila:this.props.route.params.stevilkaNarocila,
                                          })}>
                      <View style={styles.button}><Icon name='create-outline' type='ionicon' color='#5d5d5d' /></View>
            </TouchableOpacity>
          </View>

          <View style={styles.ExportHeader}>
            <Text style={styles.exportHeaderText}>{'Naziv: '}{this.props.route.params.naziv}</Text>
            <Text style={styles.exportHeaderText}>{'Ident: '}{this.props.route.params.ident}</Text>
            <Text style={styles.exportHeaderText}>{'Kolicina: '}{this.props.route.params.kolicina}</Text>
            <Text style={styles.exportHeaderText}>{'Lokacija: '}{this.props.route.params.lokacija1}{' '}{this.props.route.params.lokacija2}{' '}{this.props.route.params.lokacija3}</Text>
            <Text style={styles.exportHeaderText}>{'Zaloga: '}{this.props.route.params.zaloga}</Text>
          </View>

          <View style={styles.exportFormContainer}>

            <TextInput style={styles.unosZaloge}
                  multiline={false}
                  placeholder='Vrednost izvoza'
                  keyboardType='numeric'
                  underlineColorAndroid='transparent'
                  ref={component => this._textInput = component}
                  thousandSeparator={true}                                            
                  onChangeText={(text) => this.setState({ exportValue: this.format(text) })}
                  value={this.state.exportValue.toString()}



            />
              <TouchableOpacity onPress={() => this.export()}>
                        <Text style={styles.posaljiDugme}> IZVOZ </Text>
              </TouchableOpacity>

          </View>

        </ScrollView>
        
      );
    }
}


const styles = StyleSheet.create({

  button:{
    backgroundColor:'white',
    padding:'10%',
    borderRadius:10,
    borderWidth:1,
    borderColor: '#5d5d5d',
    

  },  

  buttonsContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:'20%',    
    width:'80%',
    marginLeft:'10%',
    marginRight:'10%',
  },

  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },

  unosZaloge:{
    backgroundColor: '#FFFFFF',
    width: '70%',
    marginLeft: '15%',
    marginRight: '15%',
    borderWidth:1,
    borderColor: '#5d5d5d',
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

ExportHeader:{
  width:'80%',
  marginLeft:'10%',
  marginRight:'10%',
  backgroundColor:'white',
  borderRadius:20,
  marginTop:'10%',
  paddingTop:'5%',
  paddingBottom:'5%',
  borderWidth:1,
  borderColor: '#5d5d5d',
},

exportHeaderText:{
  textAlign:'center',
  marginTop:'3%',
}
  
});

