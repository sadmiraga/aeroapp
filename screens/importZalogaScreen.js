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
      
      importValue: 0,
      isLoading: true,

    }
  }


    successNotification = () => {
      Alert.alert(
        'Uspešno',
        "Uspešno ste posodobili zalogo za izdelek: ",
        [
            { text: 'Ok', onPress: () => this.props.navigation.navigate('Home') },
            //MeHome
        ],
        { cancelable: false },
      );
      
    }



    export(){
      fetch('http://aeropolyplast.eu/api/import', {

        'method': 'POST',
        'headers': {
          'Accept':'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'id': this.state.productID,
          'vrenostUvoza': this.state.importValue,
        })

      })
      this.setState({
        importValue: 0,
      })
      this.successNotification();
    }

      
    render(){
      return (
        
        <ScrollView>
          <View style={styles.exportFormContainer}>
            <TextInput style={styles.unosZaloge}
                  multiline={false}
                  placeholder='Vrednost izvoza'
                  keyboardType='numeric'
                  underlineColorAndroid='transparent'
                  onChangeText={(text) => this.setState({ importValue: text })}
                  ref={component => this._textInput = component}
                  value={this.state.importValue.toString()}
            />

            

              <TouchableOpacity onPress={() => this.export()}>
                        <Text style={styles.posaljiDugme}> UVOZ </Text>
              </TouchableOpacity>

          </View>

        </ScrollView>
        
      );
    }
}


const styles = StyleSheet.create({

    exportFormContainer:{
        marginTop:'50%',
    },

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
    borderColor:'white',
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

