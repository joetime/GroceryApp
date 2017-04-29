/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  AlertIOS,
  AsyncStorage
} from 'react-native';

// components
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');

// import styles
const styles = require('./styles.js');


// (1) import firebase
import * as firebase from 'firebase';
// (2) set configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcpBKbIvsOBEU9IWi20HiZcJ8O9D405jw",
  authDomain: "groceryapp-2333f.firebaseapp.com",
  databaseURL: "https://groceryapp-2333f.firebaseio.com",
  projectId: "groceryapp-2333f",
  storageBucket: "groceryapp-2333f.appspot.com",
  messagingSenderId: "620723234214"
};
// (3) instance of firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);




// The App
export default class GroceryApp extends Component {

  // constructor
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
    this.itemsRef = firebaseApp.database().ref();
  }

  // (5) when data changes, get a snapshot
  listenForItems(itemsRef) {

    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
      var d = JSON.stringify(items);
      console.log('items', d);

      AsyncStorage.setItem('@data', d, () => {
        console.log('@data stored', d);
      });


    });
  }

  // (4) listen for data changes in componentDidMount
  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  _addItem() {

    console.log('_additem()');

    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }

  _testStorage() {
    AsyncStorage.getItem('@data', (err, d) => {
      console.log('_testStorage!', d);
    });

  }

  // renders items in the list
  _renderItem(item) {
    // what to do when we press an item
    const onPress = () => {
      AlertIOS.prompt('Complete',
        null,
        [{ text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove() },
        { text: 'Cancel', onPress: (text) => console.log('Cancel') }],
        'default');
    }

    //
    return (
      <ListItem item={item} onPress={onPress} />
    )
  }
  // main render function
  render() {
    return (
      <View style={styles.container}>
        <StatusBar title="Grocery List" />
        <ListView dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)} style={styles.listview} />
        <ActionButton title="Add" onPress={this._addItem.bind(this)} />
        <ActionButton title="Test Storage" onPress={this._testStorage.bind(this)} />
      </View>
    );
  }
}

AppRegistry.registerComponent('GroceryApp', () => GroceryApp);
