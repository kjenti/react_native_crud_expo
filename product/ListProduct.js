import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import styles from '../style/styles.js'
import axios from 'axios'

export default class ListProduct extends Component {  
      
    constructor(props) {
      super(props)
      this.state = { products: [] }
      this.renderItem = this.renderItem.bind(this)
    } 
  
    // componentDidMount still works, but only 
    // the first time it is loaded
    getProducts() {
      axios.get('http://localhost:4000/products/')
        .then(response => {
          this.setState({ products: response.data })
        })  
        .catch(function (error) {
          console.log(error)  
        })
    }

    componentDidMount() {
      this.getProducts()
      // listen to events emitted by React Navigation, in this case focus
      this._unsubscribe = this.props.navigation.addListener('focus', () => { this.getProducts() })
    }

    componentWillUnmount() {
      this._unsubscribe()
    }

    renderItem(item) {
      return (<TouchableOpacity
                onPress={() => { this.props.navigation.navigate('Edit', { name: item.name }) }}>
                <View style={ styles.item }>
                  <Text style={ styles.product }>{ item.name } - { item.brand } - { item.price }€</Text>
                </View>
              </TouchableOpacity>)
    }

    render() {
      return (
        <View style={ styles.container }>
          <Text style={ styles.header1 }>List Products</Text>
          <View style={ styles.container }>
            <FlatList
              data={ this.state.products }
              renderItem={ (item) => this.renderItem(item.item) }
              keyExtractor={ (product) => product._id }
            />
          </View>
        </View>
      )
    }
  }
