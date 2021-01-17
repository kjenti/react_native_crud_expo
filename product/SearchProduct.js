import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Keyboard, FlatList } from 'react-native'
import styles from '../style/styles.js'
import axios from 'axios'

export default class SearchProduct extends Component {  
  
  constructor(props) {  
    super(props)
    this.state = { name: '', products: [] }
    this.searchAll = this.searchAll.bind(this)
  }

  searchAll() {
    axios.post('http://localhost:4000/products/searchAll', { name: this.state.name })
      .then(json => {  
        const products = json.data
        this.setState({ products: products })
      })  
      .catch(function (error) {  
        console.log(error)  
      }) 
  }

  changeName(name) {
    // different from reactstrap
    this.setState({ name: name })
  }

  renderItem(item) {
    return (<TouchableOpacity
              onPress={() => {
              this.props.navigation.navigate('Edit', { name: item.name }) }}>
              <View style={ styles.item }>
                <Text style={ styles.product }>{ item.name } - { item.brand } - { item.price }€</Text>
              </View>
            </TouchableOpacity>)
  }

  render() {
    return (
      <View style={ styles.container }>
          <Text style={ styles.header1 }>Search Product</Text>
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
                                onPress={ this.searchAll }>
                <Text style={ styles.styledButtonText }>Search</Text>
              </TouchableOpacity>
            </View>
            <View style={ styles.container }>
              <Text style={ styles.header2 }>Results</Text>
              <FlatList
                  data={ this.state.products }
                  renderItem={ (item) => this.renderItem(item.item) }
                  keyExtractor={ (product) => product._id }
              />
            </View>
        </View>
      </View>
    )
  }  
}  
