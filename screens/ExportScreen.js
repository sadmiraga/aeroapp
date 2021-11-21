import * as React from 'react';
import { Text, View,Button, TextInput,KeyboardAvoidingView,AsyncStorage,StyleSheet,Alert,
  Picker,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export default class ExportScreen extends React.Component{

  constructor(props){
    super(props);
    this.state={
      productID: this.props.route.params.id,
      exportValue: 0,
      isLoading: true,
    }
  }




    export(){
      
      fetch('http://aeropolyplast.eu/api/export', {

        'method': 'POST',
        'headers': {
          'Accept':'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'id': this.state.productID,
          'vrednostIzvoza': this.state.exportValue,
        })

      })

      this.setState({
        exportValue: 0,
      })
      
    }

      
    render(){
      return (
        
        <ScrollView>
          <View style={styles.ExportHeader}>
          <Text>{'Naziv: '}{this.props.route.params.naziv}</Text>
          <Text>{'Ident: '}{this.props.route.params.ident}</Text>
          <Text>{'Lokacija: '}{this.props.route.params.lokacja1}{this.props.route.params.lokacja2}{this.props.route.params.lokacja3}</Text>
          <Text>{'Zaloga: '}{this.props.route.params.zaloga}</Text>
          </View>

          <View style={styles.exportFormContainer}>

            <TextInput style={styles.unosZaloge}
                  multiline={false}
                  placeholder='Vrednost izvoza'
                  keyboardType='numeric'
                  underlineColorAndroid='transparent'
                  onChangeText={(text) => this.setState({ exportValue: text })}
                  ref={component => this._textInput = component}
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
  
});

