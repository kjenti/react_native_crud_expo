import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import styles from '../style/styles.js'
import axios from 'axios'
  
export default class DeleteProduct extends Component {  
  
  constructor(props) {  
    super(props)
    this.state = { name: '' }
    this.delete = this.delete.bind(this)
  }
    
  delete() {
    axios.delete('http://localhost:4000/products/delete/' + this.state.name)  
        .then(res => {
          console.log(res)
        })
        .catch(function (error) {  
          console.log(error)  
        }) 
        this.props.navigation.navigate('List')
  }

  changeName(name) {
    this.setState({ name: name })
  }

  render() {
    return (
      <View style={ styles.container }>
          <Text style={ styles.header1 }>Delete Product</Text>
          <View style={ styles.container }>
            <TextInput
              autoCapitalize='none'
              style={ styles.textInput }
              placeholder='Enter product name'
              maxLength={ 20 }
              onBlur={ Keyboard.dismiss }
              value={ this.state.name }
              onChangeText={ (txt) => this.changeName(txt) }
            />
            <View style={ styles.container }>
              <TouchableOpacity style={ styles.styledButton } 
                                onPress={ this.delete }>
                <Text style={ styles.styledButtonText }>Delete</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    )
  }  
}