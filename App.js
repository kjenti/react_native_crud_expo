import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ListProduct from './product/ListProduct'
import AddProduct from './product/AddProduct'
import EditProduct from './product/EditProduct'
import SearchProduct from './product/SearchProduct'
import DeleteProduct from './product/DeleteProduct'

const Tab = createBottomTabNavigator()

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator 
            tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
            labelStyle: {
              fontSize: 20
            }
          }}>
            <Tab.Screen
              name='List'
              component={ ListProduct }
            />
            <Tab.Screen
              name='Edit'
              component={ EditProduct }
            />
            <Tab.Screen
              name='Add'
              component={ AddProduct }
            />
            <Tab.Screen
              name='Search'
              component={ SearchProduct }
            />
            <Tab.Screen
              name='Delete'
              component={ DeleteProduct }
            />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}

export default App