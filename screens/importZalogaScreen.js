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
      naziv: this.props.route.params.naziv,
      zaloga: this.props.route.params.zaloga,
      importValue: '',
      isLoading: true,

    }
  }


    successNotification = () => {
      Alert.alert(
        'Uspešno',
        "Uspešno ste posodobili zalogo za izdelek: "+this.state.naziv,
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
          <View style={styles.importHeader}>
            <Text style={styles.headingText}>{'naziv: '}{this.state.naziv}</Text>
            <Text style={styles.headingText}>{'zaloga: '}{this.state.zaloga}</Text>
          </View>
            <TextInput style={styles.unosZaloge}
                  multiline={false}
                  placeholder='Vrednost uvoza'
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

  headingText:{
    textAlign:'center',
  },

  importHeader:{
    width:'70%',
    marginRight:'15%',
    marginLeft:'15%',
    padding:'3%',
    borderWidth:1,
    borderRadius:10,
  },
  
  exportFormContainer:{
      marginTop:'50%',
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


  
});

