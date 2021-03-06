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
  TabBarIOS,
  AsyncStorage
} from 'react-native';

// components
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
const ListSubItem = require('./components/ListSubItem');

// import styles
const styles = require('./styles.js');

// for offline storage
const STORAGE_KEY = '@kbook:key';

// (1) import firebase
import * as firebase from 'firebase';
// (2) set configuration
const firebaseConfigGroceries = {
  apiKey: "AIzaSyAcpBKbIvsOBEU9IWi20HiZcJ8O9D405jw",
  authDomain: "groceryapp-2333f.firebaseapp.com",
  databaseURL: "https://groceryapp-2333f.firebaseio.com",
  projectId: "groceryapp-2333f",
  storageBucket: "groceryapp-2333f.appspot.com",
  messagingSenderId: "620723234214"
};
const firebaseConfigKbook = {
  apiKey: "AIzaSyCQzUnyLAzfRwLHctj2RqCfSDqfpO9pXdE",
  authDomain: "kbook2-1ce98.firebaseapp.com",
  databaseURL: "https://kbook2-1ce98.firebaseio.com",
  projectId: "kbook2-1ce98",
  storageBucket: "kbook2-1ce98.appspot.com",
  messagingSenderId: "101241005137"
};
//firebase.initializeApp(firebaseConfigKbook);
// (3) instance of firebase
const firebaseApp = firebase.initializeApp(firebaseConfigKbook);

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
    this.itemsRef = firebaseApp.database().ref('artistSongs');
  }

  // utility converts firebase array to 'real' array
  toArray(obj) {
    //return obj;
    var arr = [];
    if (!obj) return arr;
    for (var property in obj) {

      if (obj.hasOwnProperty(property)) {
        arr.push({ title: obj[property], _key: property })
      }
    }
    console.log('arr:', arr);
    return arr;
  }

  // (5) when data changes, get a snapshot
  listenForItems(itemsRef) {

    // AsyncStorage.getItem(STORAGE_KEY, (err, res) => {
    //   console.log('data retrieved:', res);
    // })

    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {

        console.log('snap.child.val()', child.val())

        var songs = this.toArray(child.val());

        console.log('songs', songs);
        //songs = this.state.dataSource.cloneWithRows([]);

        items.push({
          name: child.key,
          songs: songs, //this.toArray(songs),
          _key: child.key
        });
      });
      console.log('items raw', items);

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

      //var d = JSON.stringify(items);
      //console.log('items', d);

      // AsyncStorage.setItem(STORAGE_KEY, items, (err) => {
      //   //console.log('@data stored', err);
      // });


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
      /*AlertIOS.prompt('Complete',
        null,
        [{ text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove() },
        { text: 'Cancel', onPress: (text) => console.log('Cancel') }],
        'default');*/
    }

    const onSongPress = () => {
      AlertIOS.prompt('Complete Song',
        null,
        [{ text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove() },
        { text: 'Cancel', onPress: (text) => console.log('Cancel') }],
        'default');
    }

    //
    return (
      <ListItem item={item} onPress={onPress} onSongPress={onSongPress} />
    )
  }
  // main render function
  render() {
    return (
      <View style={styles.container}>
        <StatusBar title="Kbook" />

        <ListView dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)} style={styles.listview} />

        <ActionButton title="Add" onPress={this._addItem.bind(this)} />
        <ActionButton title="Test Storage" onPress={this._testStorage.bind(this)} />
      </View>
    );
  }
}

AppRegistry.registerComponent('GroceryApp', () => GroceryApp);
