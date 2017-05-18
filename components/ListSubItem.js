import React, { Component } from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { View, TouchableHighlight, Text, FlatList } = ReactNative;

class ListSubItem extends Component {

    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={styles.li}>
                    <Text style={styles.liText}>{this.props.item.name}</Text>
                    {/*<Text style={styles.liText}>{this.props.item.songs.length}</Text>*/}
                    <ListSubItem
                        dataSource={this.props.item.songs}
                        onPress={this.props.onSongPress} />
                </View>
            </TouchableHighlight>
        );
    }
}

module.exports = ListSubItem;