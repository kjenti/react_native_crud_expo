import React, { Component } from 'react'
import { Text,  TextInput, View, TouchableOpacity, Keyboard } from 'react-native'
import styles from '../style/styles.js'
import axios from 'axios'
  
export default class AddProduct extends Component {  
  
  constructor(props) {  
    super(props)
    this.state = { name: '', brand: '', description: '', price: '' }
    this.addProduct = this.addProduct.bind(this)
  }

  changeName(name) {
    this.setState({ name: name })
  }

  changeBrand(brand) {
    this.setState({ brand: brand })
  }

  changeDescription(description) {
    this.setState({ description: description })
  }

  changePrice(price) {
    this.setState({ price: price })
  }
    
  addProduct() {
    axios.post('http://localhost:4000/products/add', this.state)
        .then(res => {
          this.setState({ name: '', brand: '', description: '', price: '' })
          this.props.navigation.navigate('List')
        })
        .catch(function (error) {  
          console.log(error)  
        })
  }
  
  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.header1 }>Add Product</Text>
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
            <TextInput
              autoCapitalize='none'
              style={ styles.textInput }
              placeholder='Enter product brand'
              maxLength={ 20 }
              onBlur={ Keyboard.dismiss }
              value={ this.state.brand }
              onChangeText={ (txt) => this.changeBrand(txt) }
            />
            <TextInput
              autoCapitalize='none'
              style={ styles.textInput }
              placeholder='Enter product description'
              maxLength={ 20 }
              onBlur={ Keyboard.dismiss }
              value={ this.state.description }
              onChangeText={ (txt) => this.changeDescription(txt) }
            />
            <TextInput
              autoCapitalize='none'
              style={ styles.textInput }
              placeholder='Enter product price'
              maxLength={ 20 }
              onBlur={ Keyboard.dismiss }
              value={ this.state.price }
              onChangeText={ (txt) => this.changePrice(txt) }
            />
            <View style={ styles.container }>
              <TouchableOpacity style={ styles.styledButton } 
                                onPress={ this.addProduct }>
                <Text style={ styles.styledButtonText }>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
    )
  }
}