import React, { Component } from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { View, TouchableHighlight, Text, FlatList } = ReactNative;

class ListItem extends Component {
    /*_renderItemComponent = ({ item }) => {
        return (
            <ItemComponent
                item={item}
                horizontal={this.state.horizontal}
                fixedHeight={this.state.fixedHeight}
                onPress={this._pressItem}
            />
        );
    };*/

    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={styles.li}>
                    <Text style={styles.liText}>{this.props.item.name}</Text>
                    {/*<Text style={styles.liText}>{this.props.item.songs.length}</Text>*/}
                    <FlatList
                        data={this.props.item.songs}
                        renderItem={({ item }) => <Text onPress={this.props.onSongPress}>{item.title}</Text>}

                    />
                </View>
            </TouchableHighlight>
        );
    }
}

module.exports = ListItem;