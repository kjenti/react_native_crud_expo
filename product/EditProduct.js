import React, { Component } from 'react'
import { Text,  TextInput, View, TouchableOpacity, Keyboard } from 'react-native'
import axios from 'axios'
import styles from '../style/styles.js'

export default class EditProduct extends Component {  
  
  constructor(props) {  
    super(props)
    this.state = { oldName: '', name: '', brand: '', description: '', price: '' }
    this.editProduct = this.editProduct.bind(this)
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => { 
        if(typeof this.props.route.params !== 'undefined') {
            this.setState({ oldName: this.props.route.params.name })
            this.getProduct(this.props.route.params.name) 
        }})
  }

  componentWillUnmount() {
    this._unsubscribe()
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
    
  editProduct() {
    axios.post('http://localhost:4000/products/edit', this.state)
        .then(res => {
          this.setState({ name: '', brand: '', description: '', price: '' })
          this.props.navigation.navigate('List')
        })
        .catch(function (error) {  
          console.log(error)  
        })
  }

  getProduct(productName) {
    axios.post('http://localhost:4000/products/searchOne', { name: productName })
          .then(json => {
            const product = json.data[0]
            this.setState({ name: product.name,
                            brand: product.brand,
                            description: product.description,
                            price: product.price 
                          })
          })  
          .catch(function (error) {  
            console.log(error)  
          })
  }
  
  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.header1 }>Edit Product</Text>
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
                                onPress={ this.editProduct }>
                <Text style={ styles.styledButtonText }>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
    )
  }
}