const React = require('react-native')
const { StyleSheet } = React
const constants = {
    actionColor: '#24CE84'
};

var styles = StyleSheet.create({
    
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1,
    },
    listview: {
        //flexDirection: 'row',
        flex: 1,
    },
    liFlex: {
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
        flex: 1
    },
    li: {
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
        flex: 2
    },
    liFlex1: {
        flex: 2
    },
    liContainer: {
        flex: 2,
    },
    liText: {
        color: '#333',
        fontSize: 16,
        flex: 1
    },
    artistName: {
        color: '#333',
        fontSize: 20,
        flex: .5,
        fontWeight: 'bold'
    },
    songTitle: {
        color: '#338',
        fontSize: 18,
        paddingTop: 8,
        paddingLeft: 8
        
    },

    navbar: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        justifyContent: 'center',
        height: 44,
        flexDirection: 'row'
    },
    navbarTitle: {
        color: '#444',
        fontSize: 16,
        fontWeight: "500"
    },
    statusbar: {
        backgroundColor: '#fff',
        height: 22,
    },
    center: {
        textAlign: 'center',
    },
    actionText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    action: {
        backgroundColor: constants.actionColor,
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
})

module.exports = styles
module.exports.constants = constants;