import React, { Component } from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { View, TouchableHighlight, Text, FlatList, ListView } = ReactNative;

class ListItem extends Component {

    // constructor
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2 && row1.songs !== row2.songs
            })
        }
        //this.itemsRef = firebaseApp.database().ref('artistSongs');
        this.s = this.state.dataSource.cloneWithRows(this.props.item.songs);
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@asdfasdf', this.s);
    }

    render() {
        return (
                <View style={styles.li}>
                    <Text style={styles.artistName}>{this.props.item.name} ({this.props.item.songs.length})</Text>
                    <View>
                        <ListView dataSource={this.s}
                            renderRow={(rowData) => 
                                <TouchableHighlight onPress={this.props.onSongPress}><Text style={styles.songTitle}>{rowData.title}</Text></TouchableHighlight>
                                } />
                    </View>
                </View>
        );
    }
}

module.exports = ListItem;